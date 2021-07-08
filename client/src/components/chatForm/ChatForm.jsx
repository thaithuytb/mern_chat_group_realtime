import React, { useEffect, useContext } from "react";
import Conversation from "./Conversation";
import Message from "./Message";
import InfoMessage from "./InfoMessage";
import "./chatForm.css";
import { chatContext } from "./../../contexts/chatContext";
import Loading from "./../loading/Loading";

const ChatForm = ({ user, allUser }) => {
  const {
    getAllConversations,
    conversations: { isLoading, dataConversation },
  } = useContext(chatContext);

  useEffect(() => getAllConversations(), []);
  let conversationBody;
  if (isLoading) {
    return <Loading />;
  } else {
    conversationBody = (
      <div className="conversation-list">
        <Conversation user={user} allUser={allUser} data={dataConversation} />
      </div>
    );
  }
  return (
    <div className="chat">
      <div className="chatwrapper">
        <div className="chat-conversation">
          <h3>Chat</h3>
          <form className="conversation-form">
            <input placeholder="   Tìm kiếm" type="text" />
            <button disabled>send</button>
          </form>
          {conversationBody}
        </div>
        <div className="chat-message">
          <Message user={user} />
        </div>
        
        <div className="chat-infomessage">
          <InfoMessage />
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
