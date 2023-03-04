<script>
import { defineComponent } from 'vue';
import { string } from 'yup';


export default defineComponent({
    props:{
        title:{
            type: string,
            required: true,
            default: 'Note_Title'
        },
        body:{
            type:string,
            required:true,
        }
    }
})
</script>

<template>

    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div class="flex flex-row justify-between">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {{ title }}
            </h5>
            <div>
                <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Edit</button>

                <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
            </div>
        </div>
        
        <p class="font-normal text-gray-700 ">{{body}}</p>
    </a>

</template>