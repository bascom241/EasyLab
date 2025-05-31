import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:"https://easylab.onrender.com/api",
    withCredentials:true
})


