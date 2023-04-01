<script lang="ts">
import { Delta, QuillEditor } from '@vueup/vue-quill';
import { defineComponent } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import * as yup from 'yup';
import {Field, ErrorMessage, Form} from 'vee-validate';
import store from '../store';
import ButtonLoading from './partial/ButtonLoading.vue';

const schemValidate = yup.object({
    title_note: yup.string().required().max(100),
})
export default defineComponent({
    inject:['cryptoSecret'],

    components:{
        QuillEditor,
        Field,
        ErrorMessage,
        Form,
        ButtonLoading,
    },

    mounted(){
        this.noteId = this.$route.params.noteId;
        if(this.noteId){
            store.dispatch('note/detailNote',this.noteId).then(dat => {
                this.titleNote = this.detailNote.title;
                this.quillDat = this.detailNote.content;
            }).catch(err =>{

            });
        }

        this.switchEditorTheme();
    },

    data: () => {
        return {
           quillDat: "",
           schemValidate: schemValidate,
           noteId: null,
           titleNote: "",
           isLoading: false,
           toolbars:[
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],

                        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                        [{ 'direction': 'rtl' }],                         // text direction

                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        [{ 'font': [] }],
                        [{ 'align': [] }],

                        ['clean']                                         // remove formatting button
                    ],
        }
    },

    setup: ()=>{
    },
    watch:{
        isDarkTheme(current, old){
            this.switchEditorTheme();          
        }
    },
    methods:{
        handleAdd() {
            this.isLoading = true;
            const dat = {
                title: this.titleNote,
                content: this.quillDat,
            }
            if(this.noteId){
                const datUpdate = {
                    ...dat,
                    id: this.noteId,
                }
                store.dispatch('note/updateNote', datUpdate).then(dat =>{
                    this.$router.push('/?btn=true');
                }).catch(err => {

                });
            }else{
                store.dispatch('note/createNote', dat)
                .then(dat =>{
                    this.isLoading = false;
                    this.$router.push('/?btn=true');
                }).catch(err => {
                    this.isLoading = false;
                });
            }
            
        },

        saveWithoutLeave(){
            this.isLoading = true;
            const dat = {
                title: this.titleNote,
                content: this.quillDat,
            }
            if(this.noteId){
                const datUpdate = {
                    ...dat,
                    id: this.noteId,
                }
                store.dispatch('note/updateNote', datUpdate).then(dat =>{
                    // this.$router.push('/');
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            }else{
                store.dispatch('note/createNote', dat)
                .then(dat =>{
                    // this.$router.push('/');
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                });
            }
        },

        switchEditorTheme(){
            const toolbar = document.getElementsByClassName('ql-toolbar')[0];
            if(this.isDarkTheme){
                
                toolbar.classList.remove('ql-snow');
                toolbar.classList.add('ql-bubble');    
            }else{
                toolbar.classList.remove('ql-bubble');
                toolbar.classList.add('ql-snow');    
            }
        }

        // getImageSrcs(){
        //     const image = this.quillDat.match(/<img([\w\W]+?)>/g);
        //     let srcs:any[] = [];
        //     image?.forEach((el)=>{
        //         const src =  el.match(/<img.*?src=['"](.*?)['"]/);
        //         if(src){
        //             srcs.push(src[1])
        //         }
        //     });
        //     return srcs;
        // },
    },

    computed:{
        detailNote(){
            return store.state.note.detailNote;
        },
        navSideActive(){
           return store.state.base.navSideActive;
        },
        isDarkTheme(){
            return store.state.base.isDarkTheme;
        }
    }
})

</script>

<template>
    <Form @submit="handleAdd" :validation-schema="schemValidate" class="h-full">
        <div class="flex justify-end">
            <ButtonLoading :isLoading="isLoading" type="submit" classStr="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"> Save </ButtonLoading>

            <ButtonLoading type="button" @click="saveWithoutLeave" :isLoading="isLoading" classStr="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2" >Save And Continue Edit</ButtonLoading>
        </div>

        <div class="mb-2 ">
            <Field name="title_note" v-model="titleNote" type="text" id="title_note" class="placeholder-slate-500 dark:bg-black/10 dark:text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#FAFAFA] text-black" placeholder="Title Notes" />
            <ErrorMessage class="mt-2 text-sm text-red-600 dark:text-red-500" name="title_note"/>
        </div>
        
        <QuillEditor theme="snow" class="h-5/6 max-h-[35rem] z-0 dark:bg-black/10 border-gray-200 dark:text-slate-300 text-sm bg-white text-slate-800" 
            v-model:content="quillDat" 
            :toolbar="toolbars"
            content-type="html"
        />
        
    </Form>
    
</template>
