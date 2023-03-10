import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://api.cloumus30.online',
    // baseURL: 'http://localhost:3000',
});

export const axiosHeaders = () => {
    const jwt = sessionStorage.getItem('jwt');
    return {
            headers:{
            Authorization: `Bearer ${jwt}`
        }
    }
}