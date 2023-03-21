<script>
import store from '../store';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import * as yup from 'yup';
import {Form, Field, ErrorMessage} from 'vee-validate';
import FirebaseAuthUi from '../components/FirebaseAuthUi.vue';

const schemValidate = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
})
export default defineComponent({
    inject:['cryptoSecret'],
  components:{
    Form,
    Field,
    ErrorMessage,
    FirebaseAuthUi,
  },

  mounted(){
    document.title = 'Login';
  },

  data(){
    return {
        email: '',
        password: '',
        schemValidate: schemValidate,
    }
  },
  
  methods:{
    ...mapActions(['auth/login']),

    handleLogin(values){
        const input = {email: this.email, password: this.password};
        store.dispatch('auth/login', input)
        .then((dat)=>{
            if(store.state.auth.status.isLoggedIn){
                this.$router.push('/');
            }
        })
        .catch((err) =>{
            
        });
        
    }
  }

})

</script>

<template>
    <div class="flex h-screen bg-navbar">
        <div class="m-auto w-2/3 md:w-1/3 ">
            <div class="text-center text-2xl text-font-navbar">
                <h1>LOGIN</h1>
            </div>
            
            <Form @submit="handleLogin" :validation-schema="schemValidate">
                <div class="relative z-0 w-full mb-6 group">
                    <Field type="email" name="email" v-model="email" id="email" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder="" required />
                    <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alamat Email</label>
                    <ErrorMessage class="mt-2 text-sm text-red-600 dark:text-red-500" name="email" />
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <Field type="password" name="password" v-model="password" id="password" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                    <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Kata Sandi</label>
                    <ErrorMessage class="mt-2 text-sm text-red-600 dark:text-red-500" name="password" />
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <input id="checkbox-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " >
                    <label for="checkbox-1" class="ml-2 text-sm font-medium text-font-navbar">Ingat saya</label>
                </div>
                
                <div class="flex justify-around">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-mono rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Daftar</button>

                    <button type="button" class=" hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-mono rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login Google</button>
                </div>

                <FirebaseAuthUi />

                <div class="relative z-0 w-full mt-6">
                    <p class="ml-2 text-sm font-medium text-font-navbar">Belum Punya Akun? Silahkan <a href="/register" class="text-white hover:underline"> Daftar </a></p>
                </div>
            </Form>
        </div>
        
    </div>
    
</template>