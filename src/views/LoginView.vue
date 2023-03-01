<script lang="ts">
import store from '../store';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import ToastCustomVue from '../components/partial/toastCustom.vue';


export default defineComponent({
  components:{
    ToastCustomVue
  },

  mounted(){
    document.title = 'Login';
  },

  data(){
    return {
        email: '',
        password: '',
    }
  },
  
  methods:{
    ...mapActions(['auth/login']),
    handleLogin(){
        store.dispatch('auth/login', {email: this.email, password: this.password});
        console.log(store.state!);
    }
  }

})

</script>

<template>
    <div class="flex h-screen bg-navbar">
        <div class="m-auto w-1/3 ">
            <div class="text-center text-2xl text-font-navbar">
                <h1>LOGIN</h1>
            </div>
            
            <form>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="email" name="floating_email" v-model="email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder="" required />
                    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alamat Email</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="password" name="floating_password" v-model="password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                    <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Kata Sandi</label>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <input id="checkbox-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " >
                    <label for="checkbox-1" class="ml-2 text-sm font-medium text-font-navbar">Ingat saya</label>
                </div>
                
                <div class="flex justify-around">
                    <button type="button" @click="handleLogin" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-mono rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Daftar</button>

                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-mono rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login Google</button>
                </div>

                <div class="relative z-0 w-full mt-6">
                    <p class="ml-2 text-sm font-medium text-font-navbar">Belum Punya Akun? Silahkan <a href="/register" class="text-white hover:underline"> Daftar </a></p>
                </div>
            
                
            </form>
        </div>

        <ToastCustomVue time_hide="5000" />
    </div>
    
</template>