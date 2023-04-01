<script>
import { defineComponent } from 'vue';
import * as firebaseui from 'firebaseui'; 
import 'firebaseui/dist/firebaseui.css'
import store from '../store';

export default defineComponent({
    components:{
        
    },
    inject:['firebase'],

    mounted(){
        let ui = new firebaseui.auth.AuthUI(this.firebase.auth());
        const firebaseUiConfig = {
            callbacks:{
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    store.dispatch('base/showLoadingPage');

                    const res = authResult.user.getIdTokenResult().then(async (res) =>{
                        const input = {token: res.token};
                        await store.dispatch('auth/loginSosmed', input);
                        store.dispatch('base/hideLoadingPage');
                        window.location.href = '/';
                    })
                    .catch((err) => {
                        store.dispatch('base/hideLoadingPage');
                        console.log(err);
                    });
                    
                    return false;
                }
            },
            
            signInOptions : [
                this.firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            signInFlow: 'popup',
            signInSuccessUrl: '/',
        }

        ui.start('#firebase-auth-container', firebaseUiConfig);
    }
})

</script>

<template>
    <div>
        <section id="firebase-auth-container"></section>
    </div>
</template>