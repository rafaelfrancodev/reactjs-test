import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.m3o.com/v1'
});

export default api;