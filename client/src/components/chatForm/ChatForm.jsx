import React from "react";
import Conversation from "./Conversation";
import Message from "./Message";
import InfoMessage from "./InfoMessage";
import "./chatForm.css";

const ChatForm = () => {
  return (
    <div className="chat">
      <div className="chatwrapper">
        <div className="chat-conversation">
          <h3>Chat</h3>
          <form className="conversation-form">
            <input placeholder="   Tìm kiếm" type="text" />
            <button disabled>send</button>
          </form>
          <div className="conversation-list">
            <Conversation />
          </div>
        </div>

        <div className="chat-message">
          <div className="message-content">
            <div className="message-list">
              <Message />
            </div>
          </div>
          <form className="message-form">
            <textarea placeholder="   Abc" name="message" />
            <button disabled>chat</button>
          </form>
        </div>

        <div className="chat-infomessage">
          <InfoMessage />
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
