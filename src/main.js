import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toasity, { toast } from 'vue3-toastify'

import './assets/main.css'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(Vue3Toasity,{
    autoClose:3000,
    position: toast.POSITION.BOTTOM_RIGHT
});

app.mount('#app')
