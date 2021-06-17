import axios from 'axios';
import { REACT_APP_API_AUTH } from './../config/constants';
const authApi = {
    loginAuth: (user) => {
        return axios.post(`${REACT_APP_API_AUTH}/login`, user );
    },
    verifyTokenAuth : () => {
        return axios.get(`${REACT_APP_API_AUTH}`);
    }
}

export default authApi;