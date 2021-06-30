import axios from 'axios';
import { LOCAL_STORAGE_TOKEN } from '../config/constants';
export const setHeadersToken = (token) => {
    if (token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }
}