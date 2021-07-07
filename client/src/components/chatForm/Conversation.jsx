import React from "react";
import { setShowConversations } from './../../utils/setShowConversations';
const Conversation = ({ user, allUser, data }) => {
  
  console.log({user, allUser, data});
  return (
    <>
      {
        data.map((covercation) => {
          const { members } = covercation;
          const myfriends = allUser.reduce((repo, cur) => {
            return (cur._id !== user._id && members.indexOf(cur._id) >= 0)? [...repo, cur.name] : repo;
          },[]);
          console.log(myfriends)
          return (
          <div className="conversation-item" key={covercation._id}>
          <div className="conversationImg"></div>
          <div className="conversationText">{setShowConversations(myfriends)}</div>
        </div>);
        })
      }
     
    </>
  );
};

export default Conversation;
