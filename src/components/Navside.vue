<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import IconHome from '../components/icons/navside/IconHome.vue';
import IconDoc from '../components/icons/navside/IconDocument.vue';
import IconUser from './icons/navbar/IconUser.vue';
import IconClose from './icons/navside/IconClose.vue';
import IconMenu from './icons/navside/IconMenu.vue';
import store from '../store';

export default defineComponent({
    components:{
    IconHome,
    IconDoc,
    RouterLink,
    IconUser,
    IconClose,
    IconMenu,
},
computed:{
    user(){
        return store.state.auth.user;
    },
    navSideActive(){
      return store.state.base.navSideActive;
    }
},
data(){
    return{
        isActive:false,
        classHidden: 'hidden',
        classActive: 'sm:block',
    }
},

methods:{
    activateNavside(){
        store.dispatch('base/activateNavside');
    },
    deactivateNavside(){
        store.dispatch('base/deactivateNavside');
    }
}
})

</script>

<template>
    <nav class="flex flex-row text-font-navbar bg-navside dark:bg-slate-900 h-screen">
        <ul class="m-6">
            <li class="mb-6">
                <div v-if="!navSideActive" class="flex">
                    <IconMenu @click="activateNavside" class="hover:text-white hover:cursor-pointer md:hidden" />
                </div>
                <div v-if="navSideActive" class="flex justify-end">
                    <IconClose @click="deactivateNavside" class="hover:text-white hover:cursor-pointer md:hidden" />
                </div>
            </li>
            <li class="mb-6">
                <!-- <a  href=""> <IconHome class="mr-7 text-sm" /> Dashboard</a> -->
                <div class="flex flex-row" to="/">  
                    <IconUser class="mr-7 text-sm" />
                    <div class="md:flex md:flex-col" :class="(navSideActive) ? '':'hidden'">
                        <span>Login As </span> <span class="font-bold">{{ user.name }}</span>
                    </div>
                     
                </div>
            </li>
            <li class="mb-6">
                <!-- <a  href=""> <IconHome class="mr-7 text-sm" /> Dashboard</a> -->
                <RouterLink @click="deactivateNavside" class="hover:text-white flex flex-row" to="/">  
                    <IconHome class="mr-7 text-sm" /> <span class="md:block" :class="(navSideActive) ? '':'hidden'">List Notes</span> 
                </RouterLink>
            </li>
            <li class="mb-6">
                <RouterLink @click="deactivateNavside" class="hover:text-white flex flex-row" to="/note/add">  
                     <IconDoc class="mr-7 text-sm" /> <span class="md:block" :class="(navSideActive) ? '':'hidden'">Add Notes</span> 
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>