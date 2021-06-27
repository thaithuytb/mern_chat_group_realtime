import axios from 'axios';
import { REACT_APP_API } from './../config/constants';
const postsApi = {
    getPosts: () => {
        return axios.get(`${REACT_APP_API}/posts`);
    },
    // registerAuth: (user) => {
    //     return axios.post(`${REACT_APP_API_AUTH}/register`, user );
    // }
}

export default postsApi;