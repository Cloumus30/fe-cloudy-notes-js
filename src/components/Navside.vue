<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import IconHome from '@/components/icons/navside/IconHome.vue';
import IconDoc from '@/components/icons/navside/IconDocument.vue';

export default defineComponent({
    components:{
        IconHome, IconDoc, RouterLink
    }
})

</script>

<template>
    <nav class="flex flex-row text-font-navbar bg-slate-900 h-screen">
        <ul class="m-6">
            <li class="mb-6">
                <!-- <a  href=""> <IconHome class="mr-7 text-sm" /> Dashboard</a> -->
                <RouterLink class="hover:text-white flex flex-row" to="/">  
                    <IconHome class="mr-7 text-sm" /> Dashboard
                </RouterLink>
            </li>
            <li class="mb-6">
                <RouterLink class="hover:text-white flex flex-row" to="/note">  
                     <IconDoc class="mr-7 text-sm" /> Add Notes
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>