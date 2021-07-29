import axios from 'axios';
import { REACT_APP_API, REACT_APP_API_AUTH } from 'constants/constantReactApi';
const authApi = {
    loginAuth: (user) => {
        return axios.post(`${REACT_APP_API_AUTH}/login`, user );
    },
    verifyTokenAuth : () => {
        return axios.get(`${REACT_APP_API_AUTH}`);
    },
    registerAuth: (user) => {
        return axios.post(`${REACT_APP_API_AUTH}/register`, user );
    },
    getAllUser: () => {
        return axios.get(`${REACT_APP_API}/username`);
    },
}

export default authApi;