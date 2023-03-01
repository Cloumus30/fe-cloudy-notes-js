
<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        props:{
            bodyNotif:{
                required:true,
                type:String,
            }
        },
        data(){
            return{
                wordCount:20
            }
        }
    })
</script>

<template>
    <div class="shadow shadow-slate-50 bg-slate-600 text-slate-300 p-5 rounded-lg hover:text-white ">
        <!-- Title Notification -->
        <div class="font-bold">
            <p>Judul Notifikasi 1</p>
        </div>
        <!-- Title Notification -->

        <!-- Body Notification -->
        <div class="text-sm">
            <p >{{ bodyNotif }}</p>
        </div>
        <!-- Body Notification -->
    </div>
</template>