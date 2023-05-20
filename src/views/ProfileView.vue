<script>
import HelloWorld from '../components/HelloWorld.vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue';
import Navside from '../components/Navside.vue';
import { defineComponent } from 'vue';
import NoteCard from '../components/partial/NoteCard.vue';
import store from '../store';
import PopModal from '../components/partial/PopModal.vue';
import IconSearch from '../components/icons/IconSearch.vue';
import { toast } from 'vue3-toastify';

export default defineComponent({
  components:{
    HelloWorld,
    Navbar,
    Navside,
    NoteCard,
    PopModal,
    IconSearch,
},

  mounted(){
    document.title = 'Update Profile';
  },
  
  data(){
    return {
      body: {},
      activeNavsideClass: 'w-full absolute',
      defaultNavsideClass: 'w-1/6 md:w-2/6 xl:w-1/6',
      password: null,
      passwordConfirm:null,
    }
  },
  computed:{
    navSideActive(){
      return store.state.base.navSideActive;
    },
    isPageLoading(){
        return store.state.base.isPageLoading;
    },
    user(){
        return store.state.auth.user;
    }
  },

  methods:{
    updatePassword(event){
        event.preventDefault()
        if(this.password != this.passwordConfirm){
            toast('⚠️ Confirm Password Did not Match')
            return null
        }
        console.log('coba');
        const input = {password: this.password};
        this.isLoading = true;
        store.dispatch('profile/updateUserPassword', input)
        .then((dat)=>{
            this.password = ''
            this.passwordConfirm = ''
            window.location.href= '/'
        })
        .catch((err) =>{
            this.isLoading = false;
        });
    }
  }

})

</script>

<template>
  <div class="w-full h-full">
    <loading-page :isShow="isPageLoading"></loading-page>
    
    <header>
        <Navbar />
    </header>
    <main class="flex dark:bg-black/90 dark:text-white bg-[#E4E3E5] text-black">
      
      <Navside :class="[navSideActive ? activeNavsideClass : defaultNavsideClass]" />
      
      <div class="w-5/6 md:w-4/6 xl:w-5/6 h-fit p-12 ">
        <div class="flex flex-col w-full">
            <div class="mx-auto text-3xl">
                Update Profile
            </div>
            <form action="">
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" v-model="password" required>
                </div>
                <div class="mb-6">
                    <label for="password-confirm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirm</label>
                    <input type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password Confirm" v-model="passwordConfirm" required>
                </div>

                <div class="mb-6 flex w-full">
                    <div class="mx-auto">
                        <button type="submit" @click="updatePassword($event)" class="text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-10 py-2.5 text-center text-base mr-2 mb-2">Submit</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
      
    </main>
  </div>
  
</template>
