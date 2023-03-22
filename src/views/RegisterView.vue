<script>
import { defineComponent } from 'vue';
import store from '../store/index';
import {mapActions} from 'vuex';
import * as yup from 'yup';
import {Field, ErrorMessage, Form} from 'vee-validate';
import FirebaseAuthUi from '../components/FirebaseAuthUi.vue';

const validateSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    password_confirm: yup.string().required().oneOf([yup.ref('password')], 'Password Does Not Match'),
});

export default defineComponent({
    inject:['cryptoSecret'],
  components:{
    Field,
    ErrorMessage,
    Form,
    FirebaseAuthUi
  },
  mounted(){
    document.title = 'Register';
  },
  data(){
    return {
        name:'',
        email:'',
        password:'',
        passwordConfirm:'',
        validateSchema: validateSchema
    }
  },

  methods:{
    ... mapActions(['auth.register']),
    handleRegister(values){
        const dat = {
            name: this.name,
            email: this.email,
            password: this.password,
        }
        store.dispatch('auth/register', dat)
        .then(dat => {
            // this.$router.push('/login');
            window.location.href = '/login';
        }).catch(err => {

        });
    }
  }

})

</script>

<template>
    <div class="flex h-screen bg-navbar">
        <div class="m-auto w-2/3 md:w-1/3 ">
            <div class="text-center text-2xl text-font-navbar">
                <h1>DAFTAR</h1>
            </div>
            
            <Form @submit="handleRegister" :validation-schema= validateSchema>
                <div class="relative z-0 w-full mb-6 group">
                    <Field type="text" v-model="name" name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder="" />
                    <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nama</label>
                    <ErrorMessage class="mt-2 text-sm text-red-600 dark:text-red-500" name="name" />
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <Field type="email" v-model="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder="" />
                    <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alamat Email</label>
                    <ErrorMessage class="mt-2 text-sm text-red-600 dark:text-red-500" name="email" />
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <Field type="password" v-model="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                    <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Kata Sandi</label>
                    <ErrorMessage class="mt-2 text-sm text-red-600 dark:text-red-500" name="password" />
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <Field type="password" v-model="passwordConfirm" name="password_confirm" id="password_confirm" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                    <label for="password_confirm" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Konfirm Kata Sandi</label>
                    <ErrorMessage class="mt-2 text-sm text-red-600 dark:text-red-500" name="password_confirm" />
                </div>
                
                <div class="flex justify-around">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-mono rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Daftar</button>

                </div>

                <FirebaseAuthUi />

                <div class="relative z-0 w-full mt-6">
                    <p class="ml-2 text-sm font-medium text-font-navbar">Sudah Punya Akun? Silahkan <a href="/login" class="text-white hover:underline"> login </a></p>
                </div>
                
            </Form>
        </div>
    </div>
    
</template>