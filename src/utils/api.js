import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
    baseURL : API_URL,
});

const accessToken = localStorage.getItem('access');
if(accessToken){
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}
export default api;
