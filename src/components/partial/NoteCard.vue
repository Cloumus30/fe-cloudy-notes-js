<script>
import { defineComponent } from 'vue';
import store from '../../store';


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
            type: String,
            required:true,
        },
        noteId:{
            required:true,
        }
    }, 

    methods:{
        editNote(){
            this.$router.push(`/note/${this.noteId}/edit`);
        },
        deleteNote(){
            this.$emit('deleteEvent', this.noteId)
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
        
        <p class="font-normal text-slate-200 ">{{body}}</p>
        
        <div class="self-end">
            <button type="button" @click="editNote" class="text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Edit</button>

            <button type="button" @click.stop="deleteNote" class="text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
        </div>
    </div>

</template>