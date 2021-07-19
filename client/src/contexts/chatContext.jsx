import React, { useState, useEffect, useContext} from "react";
import chatApi from "./../api/chatApi";
import { authContext } from './authContext';
import { getArrIdMembers } from './../utils/getArrIdMember';
export const chatContext = React.createContext();
const ChatContextProvider = ({ children }) => {
  const [conversations, setConversations] = useState({
    isLoading: true,
    dataConversation: null,
  });
  const [messages, setMessages] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [dataNotifyMessage, setDataNotifyMessage] = useState(null);
  const { authState: { user}} = useContext(authContext);

  const getAllConversations = async () => {
    const { getAllConversation } = chatApi;
    try {
      const response = await getAllConversation();
      if (response.data.success) {
        setConversations({
          ...conversations,
          isLoading: false,
          dataConversation: response.data.conversations,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
   //getAllConversations
  useEffect(() => getAllConversations(), [user]);

  const getAllMessage = async (conversationId) => {
    const { getAllMessageInConversation } = chatApi;
    try {
      const response = await getAllMessageInConversation(conversationId);
      if (response.data.success) {
        setCurrentConversationId(conversationId);
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const postMessageInConversation = async (dt) => {
    const { postMessage } = chatApi;
    try {
      const response = await postMessage(dt);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  //notify
  const getAllNotify = async (arrConv) => {
    const { getAllNotificationMessage } = chatApi;
    try {
      const response = await getAllNotificationMessage(arrConv);
      if (response.data.success) {
        setDataNotifyMessage(response.data.notificationMessage);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // send seen message
  const sendSeenMessage = async (arg) => {
    const { putNotificationMessage } = chatApi;
    const { conversationId, sttUser } = arg;
    try {
      const response = await putNotificationMessage({conversationId, sttUser});
      if (response.data.success) {
        return true;
      }
    } catch (error) {
        console.log(error.message);
    }
  }
  // notify has new message
  const notifyHasNewMessage = async (arg) => {
    const { putNewNotify } = chatApi;
    try {
      const response = await putNewNotify(arg);
      if (response.data.success) {
        return true;
      }
    } catch (error) {
        console.log(error.message);
    }
  }
    // pull notifi in conversation
    useEffect(() => {
      if (conversations.dataConversation) {
        getAllNotify(getArrIdMembers(conversations.dataConversation));
      }
    }, [conversations.dataConversation]);

  const dataChat = {
    conversations,
    messages,
    setMessages,
    getAllConversations,
    getAllMessage,
    postMessageInConversation,
    currentConversationId,
    getAllNotify,
    dataNotifyMessage,
    sendSeenMessage,
    notifyHasNewMessage,
    setDataNotifyMessage
  };
  return (
    <chatContext.Provider value={dataChat}>{children}</chatContext.Provider>
  );
};

export default ChatContextProvider;
