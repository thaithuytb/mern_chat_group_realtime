import React, { useEffect, useContext, useRef, useState} from "react";
import { io } from "socket.io-client";
import { REACT_APP } from "../../config/constants";
import Conversation from "./Conversation";
import Message from "./Message";
import InfoMessage from "./InfoMessage";
import "./chatForm.css";
import { chatContext } from "./../../contexts/chatContext";
import Loading from "./../loading/Loading";

const ChatForm = ({ user, allUser }) => {
  const [ listUserIdOnline, setListUserOnline ] = useState([]);
  const chatSocket = useRef();
  const {
    getAllConversations,
    conversations: { isLoading, dataConversation },
  } = useContext(chatContext);
  useEffect(() =>{
    getAllConversations();
    chatSocket.current = io(REACT_APP, { transports : ["websocket"]});
    chatSocket.current.emit("send-user-info" , user._id);
    chatSocket.current.on("users-online", (users) => {
      // remove userId of myseft...
      const arrIdUsersOnline = users.reduce((repo, cur) => {
        return  (cur.userId === user._id) ? repo :[...repo, cur.userId];
      }, []);
      setListUserOnline(arrIdUsersOnline);
    })
  },[]);
  let conversationBody;
  if (isLoading) {
    return <Loading />;
  } else {
    conversationBody = (
      <div className="conversation-list">
        <Conversation user={user} allUser={allUser} data={dataConversation} listUserIdOnline={listUserIdOnline}/>
      </div>
    );
  }
  return (
    <div className="chat">
      <div className="chatwrapper">
        <div className="chat-conversation">
          <div className="chat-conversation-note">
            <h3>Chat</h3>
            <div className="chat-conversation-note-icon">
                <div className="chat-conversation-online"><span /><span>Đang online 😁</span></div>
                <div className="chat-conversation-offline"><span /><span>Đang offline 😞</span></div>
            </div>
          </div>
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
