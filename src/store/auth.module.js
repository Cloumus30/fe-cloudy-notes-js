import { toast } from "vue3-toastify";
import { axiosInstance } from "../plugin/axios_service";
import { encryptBody } from "../plugin/crypto_service";
import { useCookies } from "vue3-cookies";
const {cookies} = useCookies();

const user = cookies.get('user');
const jwt = cookies.get('jwt');
const authExpired = parseInt(import.meta.env.VITE_AUTH_EXPIRED ?? 3600);
const initialState = jwt ? {status: {isLoggedIn:true}, user, jwt} : {status: {isLoggedIn:false}, user:null, jwt:null};

export const auth= {
    namespaced: true,
    state: initialState,
    actions: {
        async login(context, LoginDat){
            return new Promise((resolve, reject) => {
                // const encrypted = encryptBody(LoginDat);
                axiosInstance.post('/auth/login/',LoginDat).then(data =>{
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
                cookies.remove('user');
                cookies.remove('jwt');
                toast('Logout success');
                context.commit('logoutSuccess');
                resolve('success logout');
            })
        },

        async register(context, RegisDat){
            // const encrypted = encryptBody(RegisDat);
            return new Promise((resolve, reject) =>{
                axiosInstance.post('/auth/register', RegisDat).then(data=>{
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
                // const encrypted = encryptBody(loginDat);
                axiosInstance.post('/auth/login-sosmed',loginDat).then(data =>{
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
            cookies.set('user',user,authExpired);
            cookies.set('jwt', jwt,authExpired);
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
 