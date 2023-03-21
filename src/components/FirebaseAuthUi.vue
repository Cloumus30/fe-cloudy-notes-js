<script>
import { defineComponent } from 'vue';
import * as firebaseui from 'firebaseui'; 
import 'firebaseui/dist/firebaseui.css'

export default defineComponent({
    inject:['firebase'],

    mounted(){
        let ui = new firebaseui.auth.AuthUI(this.firebase.auth());
        const firebaseUiConfig = {
            signInOptions : [
                this.firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            signInFlow: 'popup',
            signInSuccessUrl: '/login',
        }

        ui.start('#firebase-auth-container', firebaseUiConfig);
    }
})

</script>

<template>
    <section id="firebase-auth-container"></section>
</template>