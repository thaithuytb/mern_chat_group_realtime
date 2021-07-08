import React, { useContext } from "react";
import { chatContext } from "../../contexts/chatContext";
import { setShowConversations } from './../../utils/setShowConversations';
import { checkTwoArr } from "../../utils/checkTwoArr";
const Conversation = ({ user, allUser, data, listUserIdOnline}) => {
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
          // get id
          const myfriends = allUser?.reduce((repo, cur) => {
            return (cur._id !== user._id && members.indexOf(cur._id) >= 0)? [...repo, cur.name] : repo;
          },[]);
          //get id
          const myListId = allUser?.reduce((repo, cur) => {
            return (cur._id !== user._id && members.indexOf(cur._id) >= 0)? [...repo, cur._id] : repo;
          },[]);
          console.log(listUserIdOnline, myListId);
          return (
          <div className="conversation-item" key={conversation._id} onClick={() => getMessageInConversation(conversation._id)}>
          <div className="conversationImg">
            <span className={ checkTwoArr(myListId, listUserIdOnline) ? "conversationStatus" : "conversationStatus true"}/>
          </div>
          <div className="conversationText">{setShowConversations(myfriends)}</div>
        </div>);
        })
      }
     
    </>
  );
};

export default Conversation;
