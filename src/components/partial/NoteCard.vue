<script>
import { defineComponent } from 'vue';
import store from '../../store';
import {DateTime} from 'luxon';


export default defineComponent({
    components:{
    },
    props:{
        title:{
            type: String,
            required: true,
            default: 'Note_Title'
        },
        body:{
            type: Object,
            required:true,
        },
        noteId:{
            required:true,
        }
    }, 

    data(){
        return {
            
        }
    },

    mounted(){
        
    },

    methods:{
        editNote(){
            this.$router.push(`/note/${this.noteId}/edit`);
        },
        deleteNote(){
            this.$emit('deleteEvent', this.noteId)
        }
    },

    computed:{
        createdAt(){
            const createdAt = DateTime.fromISO(this.body.created_at).toFormat('dd-mm-yyyy');
            return createdAt;
        },
        updatedAt(){
            const updatedAt = DateTime.fromISO(this.body.updated_at).toFormat('dd-mm-yyyy');
            return updatedAt;
        }
    }
})
</script>

<template>

    <div @click="editNote" class="flex flex-col items-stretch max-w-sm p-6 bg-slate-700 border border-gray-200 rounded-lg shadow hover:bg-gray-900 text-slate-200">
        <div class="">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-slate-200 ">
                {{ title }}
            </h5>
        </div>
        
        <p class="font-normal text-slate-200 ">
            <span>Created At: </span> <span>{{ createdAt }}</span>
        </p>
        <p class="font-normal text-slate-200 ">
            <span>Updated At: </span> <span>{{ updatedAt }}</span>
        </p>
        
        <div class="self-end">
            <button type="button" @click="editNote" class="text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Edit</button>

            <button type="button" @click.stop="deleteNote" class="text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
        </div>
    </div>

</template>