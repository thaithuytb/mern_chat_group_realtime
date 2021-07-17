import React, { useState } from "react";
import chatApi from "./../api/chatApi";
export const chatContext = React.createContext();
const ChatContextProvider = ({ children }) => {
  const [conversations, setConversations] = useState({
    isLoading: true,
    dataConversation: null,
  });
  const [messages, setMessages] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [dataNotifyMessage, setDataNotifyMessage] = useState(null);
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

  const dataChat = {
    conversations,
    messages,
    setMessages,
    getAllConversations,
    getAllMessage,
    postMessageInConversation,
    currentConversationId,
    getAllNotify,
    dataNotifyMessage
  };
  return (
    <chatContext.Provider value={dataChat}>{children}</chatContext.Provider>
  );
};

export default ChatContextProvider;
