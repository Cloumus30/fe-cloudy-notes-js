import { toast } from "vue3-toastify";
import { axiosHeaders, axiosInstance } from "../plugin/axios_service";
import { useCookies } from "vue3-cookies";
const {cookies} = useCookies();

export const profile = {
    namespaced:true,
    state:{
    },
    actions:{
       updateUserPassword(context, passDat){
            return new Promise((resolve, reject) => {
                axiosInstance.put('/api/user/pass',passDat, axiosHeaders())
                .then(data => {
                    toast('Update Password Success');
                    const user = data.data.data;
                    const authExpired = parseInt(import.meta.env.VITE_AUTH_EXPIRED ?? 3600);
                    cookies.set('user',user,authExpired);
                    resolve(user);
                })
                .catch(err => {
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);
                });
            })
       }
    },
    
    mutations:{
    }
}