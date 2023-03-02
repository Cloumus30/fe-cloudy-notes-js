import { toast } from "vue3-toastify";
import { axiosInstance } from "../plugin/axios_service";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {status: {isLoggedIn:true}, user} : {status: {isLoggedIn:false}, user:null};

export const auth= {
    namespaced: true,
    state: initialState,
    actions: {
        async login(context, LoginDat){
            return new Promise((resolve, reject) => {
                axiosInstance.post('/auth/login/',LoginDat).then(data =>{
                    const user = data.data.data.user || null;
                    const jwt = data.data.data.access_key || null;
                    context.commit('loginSuccess', {user, jwt});
                    toast('Login Success')
                    resolve(data)
                }).catch(err =>{
                    context.commit('loginFailed')
                    toast(err.message);
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
        }
    },
    mutations: {
        loginSuccess(state, {user, jwt}){
            localStorage.setItem('user',JSON.stringify(user));
            sessionStorage.setItem('jwt', jwt);
            state.status.isLoggedIn = true;
            state.user = user;
        },
        loginFailed(state){
            state.status.isLoggedIn =false;
            state.user = null;
        },
        logoutSuccess(state){
            state.status.isLoggedIn = false;
            state.user = null;
        }
    }
}
 