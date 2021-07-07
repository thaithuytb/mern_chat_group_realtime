import React, { useState, useEffect } from 'react';
import chatApi from './../api/chatApi';
export const chatContext = React.createContext();
const ChatContextProvider = ({children}) => {
    const [ conversations ,setConversations ] = useState({
        isLoading: true,
        dataConversation: null
    });

    const getAllConversations = async () => {
        const { getAllConversation } = chatApi;
        try {
            const response = await getAllConversation();
            if ( response.data.success ) {
                setConversations({
                    ...conversations,
                    isLoading: false,
                    dataConversation: response.data.conversations
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const dataChat = { conversations, getAllConversations };
    return (
        <chatContext.Provider value={dataChat}>
            {children}
        </chatContext.Provider>
    )
}

export default ChatContextProvider;
