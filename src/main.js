import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toasity, { toast } from 'vue3-toastify'
import vueCryptojs from 'vue-cryptojs'

import './assets/main.css'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(Vue3Toasity,{
    autoClose:3000,
    position: toast.POSITION.BOTTOM_RIGHT
});

app.use(vueCryptojs)

app.provide('cryptoSecret',import.meta.env.VITE_CRYPTO_SECRET);


app.mount('#app')
