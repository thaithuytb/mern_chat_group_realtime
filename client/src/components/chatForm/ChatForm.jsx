import React, { useContext } from "react";
import { displayContext } from "./../../contexts/displayContext";
import Conversation from "./Conversation";
import Message from "./Message";
// import InfoMessage from "./InfoMessage";
import "./chatForm.css";

const ChatForm = () => {
  const {theme, setIsShowChangeInfo, showDetail, setShowDetail } =
    useContext(displayContext);
    const styleBackgroundChild = { background: theme.isDark? theme.dark.component.backgroundChild: theme.light.component.backgroundChild};

  return (
    <div
      className="chat"
      onClick={() => {
        setIsShowChangeInfo(false);
        showDetail !== 0 && setShowDetail(0);
      }}
    >
      <div className="chatwrapper">
        <div className="chat-conversation">
          <div className="chat-conversation-note">
            <h3>Chat</h3>
            <div className="chat-conversation-note-icon">
              <div className="chat-conversation-online">
                <span />
                <span>Đang online 😁</span>
              </div>
              <div className="chat-conversation-offline">
                <span />
                <span>Đang offline 😞</span>
              </div>
            </div>
          </div>
          <form className="conversation-form">
            <input placeholder="Tìm kiếm" type="text" style={styleBackgroundChild} />
            <button disabled style={styleBackgroundChild}>send</button>
          </form>
          <div className="conversation-list">
            <Conversation />
          </div>
        </div>
        <div className="chat-message">
          <Message />
        </div>

        {/* <div className="chat-infomessage">
          <InfoMessage />
        </div> */}
      </div>
    </div>
  );
};

export default ChatForm;
