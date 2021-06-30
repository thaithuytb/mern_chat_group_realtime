import axios from 'axios';
import { REACT_APP_API } from './../config/constants';
const postsApi = {
    getPosts: () => {
        return axios.get(`${REACT_APP_API}/posts`);
    },
    postMyPost: (post) => {
        return axios.post(`${REACT_APP_API}/posts`, post);
    },
}

export default postsApi;