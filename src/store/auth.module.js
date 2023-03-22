import { toast } from "vue3-toastify";
import { axiosInstance } from "../plugin/axios_service";
import { encryptBody } from "../plugin/crypto_service";

const user = JSON.parse(localStorage.getItem('user'));
const jwt = sessionStorage.getItem('jwt');
const initialState = jwt ? {status: {isLoggedIn:true}, user, jwt} : {status: {isLoggedIn:false}, user:null, jwt:null};

export const auth= {
    namespaced: true,
    state: initialState,
    actions: {
        async login(context, LoginDat){
            return new Promise((resolve, reject) => {
                const encrypted = encryptBody(LoginDat);
                axiosInstance.post('/auth/login/',encrypted).then(data =>{
                    const user = data.data.data.user || null;
                    const jwt = data.data.data.access_key || null;
                    context.commit('loginSuccess', {user, jwt});
                    toast('Login Success')
                    resolve(data)
                }).catch(err =>{
                    context.commit('loginFailed')
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);
                });  
            })
        },
        
        async logout(context){
            return new Promise((resolve, reject) => {
                localStorage.removeItem('user');
                sessionStorage.removeItem('jwt');
                toast('Logout success');
                context.commit('logoutSuccess');
                resolve('success logout');
            })
        },

        async register(context, RegisDat){
            const encrypted = encryptBody(RegisDat);
            return new Promise((resolve, reject) =>{
                axiosInstance.post('/auth/register', encrypted).then(data=>{
                    toast('Register Success, Please Login');
                    resolve(data);
                }).catch(err =>{
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);
                })
            });
        },

        async loginSosmed(context, loginDat){
            return new Promise((resolve, reject) => {
                const encrypted = encryptBody(loginDat);
                axiosInstance.post('/auth/login-sosmed',encrypted).then(data =>{
                    const user = data.data.data.user || null;
                    const jwt = data.data.data.access_key || null;
                    context.commit('loginSuccess', {user, jwt});
                    toast('Login Success')
                    resolve(data)
                }).catch(err =>{
                    context.commit('loginFailed')
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);
                });  
            })
        }
    },
    mutations: {
        loginSuccess(state, {user, jwt}){
            localStorage.setItem('user',JSON.stringify(user));
            sessionStorage.setItem('jwt', jwt);
            state.status.isLoggedIn = true;
            state.user = user;
            state.jwt = jwt;
        },
        loginFailed(state){
            state.status.isLoggedIn =false;
            state.user = null;
            state.jwt = null;
        },
        logoutSuccess(state){
            state.status.isLoggedIn = false;
            state.user = null;
            state.jwt = null;
        }
    }
}
 