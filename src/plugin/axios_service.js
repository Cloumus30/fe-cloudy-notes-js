import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import store from '../store';
import { toast } from 'vue3-toastify';

const {cookies} = useCookies();
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL || 'https://api.cloumus30.online',
    // baseURL: 'http://localhost:3000',
});

export const axiosHeaders = () => {
    const jwt = cookies.get('jwt');
    if(!jwt){
        window.location.href = '/login'
    }
    return {
            headers:{
            Authorization: `Bearer ${jwt}`
        }
    }
}