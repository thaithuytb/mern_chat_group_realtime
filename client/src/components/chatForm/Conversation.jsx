import React, { useContext } from "react";
import { chatContext } from "../../contexts/chatContext";
import { setShowConversations } from './../../utils/setShowConversations';
const Conversation = ({ user, allUser, data }) => {
  const { getAllMessage } = useContext(chatContext);
  const getMessageInConversation = async (conversationId) => {
    try {
      await getAllMessage(conversationId);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <>
      {
        data.map((conversation) => {
          const { members } = conversation;
          const myfriends = allUser?.reduce((repo, cur) => {
            return (cur._id !== user._id && members.indexOf(cur._id) >= 0)? [...repo, cur.name] : repo;
          },[]);
          return (
          <div className="conversation-item" key={conversation._id} onClick={() => getMessageInConversation(conversation._id)}>
          <div className="conversationImg"></div>
          <div className="conversationText">{setShowConversations(myfriends)}</div>
        </div>);
        })
      }
     
    </>
  );
};

export default Conversation;
