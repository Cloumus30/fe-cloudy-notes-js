import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toasity, { toast } from 'vue3-toastify'
import vueCryptojs from 'vue-cryptojs'
import {config} from './config/firebaseConfig'
import firebase from 'firebase/compat/app';
import LoadingPage from './components/partial/LoadingPage.vue'
import VueCookies from 'vue3-cookies'

import './assets/main.css'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(Vue3Toasity,{
    autoClose:3000,
    position: toast.POSITION.BOTTOM_RIGHT
});

app.component('loading-page', LoadingPage)

app.use(vueCryptojs)

app.provide('cryptoSecret',import.meta.env.VITE_CRYPTO_SECRET);

firebase.initializeApp(config);

app.provide('firebase', firebase);

app.use(VueCookies);

app.mount('#app')
