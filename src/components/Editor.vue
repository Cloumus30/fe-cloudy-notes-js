<script lang="ts">
import { Delta, QuillEditor } from '@vueup/vue-quill';
import { defineComponent } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

export default defineComponent({
    components:{
        QuillEditor
    },

    data: () => {
        return {
           quillDat: "",
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
        // quillDat(current:any, old:any){
        //     console.log(current.match(/<img([\w\W]+?)>/g));
        // }
    },
    methods:{
        handleClick() {
            this.getImageSrcs();
        },
        getImageSrcs(){
            const image = this.quillDat.match(/<img([\w\W]+?)>/g);
            let srcs:any[] = [];
            image?.forEach((el)=>{
                const src =  el.match(/<img.*?src=['"](.*?)['"]/);
                if(src){
                    srcs.push(src[1])
                }
            });
            return srcs;
        },
    }
})

</script>


<template>
    <QuillEditor theme="snow" class="h-5/6" :toolbar="toolbars" 
        v-model:content="quillDat" 
        content-type="html"
         />
    <button @click="handleClick()">Klik Dinisi</button>
</template>