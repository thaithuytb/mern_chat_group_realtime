import axios from 'axios';
import { REACT_APP_API } from './../config/constants';
const chatApi = {
    getAllConversation: () => {
        return axios.get(`${REACT_APP_API}/conversations`);
    },
    postSingleConversation: (listFriend) => {
        return axios.post(`${REACT_APP_API}/conversation`, listFriend);
    },
    getAllMessageInConversation: (conversationId) => {
        return axios.get(`${REACT_APP_API}/messages/${conversationId}`);
    },
    postMessage: ({ conversationId, message}) => {
        return axios.post(`${REACT_APP_API}/messages/${conversationId}`, { message});
    }, 
}

export default chatApi;