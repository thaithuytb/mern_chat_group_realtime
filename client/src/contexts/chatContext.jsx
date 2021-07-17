import React, { useState, useEffect, useContext} from "react";
import chatApi from "./../api/chatApi";
import { authContext } from './authContext';
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
    // pull notifi in conversation
    useEffect(() => {
      if (conversations.dataConversation) {
        const getArrmember = (data) => {
          return data.reduce((repo, cur) => {
            return [...repo, cur._id];
          }, []);
        };
        getAllNotify(getArrmember(conversations.dataConversation));
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
  };
  return (
    <chatContext.Provider value={dataChat}>{children}</chatContext.Provider>
  );
};

export default ChatContextProvider;
