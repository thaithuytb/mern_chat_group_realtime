import axios from 'axios';
import { REACT_APP_API } from './../config/constants';
const postsApi = {
    getPosts: () => {
        return axios.get(`${REACT_APP_API}/posts`);
    },
    postMyPost: (post) => {
        return axios.post(`${REACT_APP_API}/posts`, post);
    },
    putMyPost: (info) => {
        const { title, description, _id} = info;
        return axios.put(`${REACT_APP_API}/posts/${_id}`, {title, description});
    }
}

export default postsApi;