import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://api.cloumus30.online',
    // baseURL: 'http://localhost:3000',
});