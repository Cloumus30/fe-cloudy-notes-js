import axios from 'axios';

const jwt = sessionStorage.getItem('jwt');
export const axiosInstance = axios.create({
    baseURL: 'http://api.cloumus30.online',
    // baseURL: 'http://localhost:3000',
    headers:{
        Authorization: `Bearer ${jwt}`
    }
});