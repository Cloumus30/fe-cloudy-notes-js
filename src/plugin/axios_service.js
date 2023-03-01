import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://203.175.11.186',
    // baseURL: 'http://localhost:3000',
    timeout: 1000
});