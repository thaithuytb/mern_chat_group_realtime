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
    getNotificationMessage: (conversationId) => {
        return axios.get(`${REACT_APP_API}/notificationMessage/${conversationId}`);
    },
    putNotificationMessage: ({ conversationId, sttUser }) => {
        const content_type = { numberOfUserInNotifyMessage: sttUser };
        return axios.put(`${REACT_APP_API}/notificationMessage/${conversationId}`, content_type);
    },
    getAllNotificationMessage: (listConversationId) => {
        return axios.post(`${REACT_APP_API}/notificationMessage`, { listConversations: listConversationId});
    },
    putNewNotify: (conversationId) => {
        return axios.put(`${REACT_APP_API}/notificationMessage`, {conversationId});
    },
}

//su dung post moi dinh dc req.body
export default chatApi;