import React, { useContext, useState, useRef, useEffect } from "react";
import { chatContext } from "../../contexts/chatContext";
import { authContext } from "./../../contexts/authContext";
import { displayContext } from "../../contexts/displayContext";
import { format } from "timeago.js";
import noAvt from "../../assets/noAvt.png";
import { io } from "socket.io-client";
import { REACT_APP } from "../../config/constants";

let chatSocket;
const addOneNotify = (data) => {
  return data.reduce((repo, cur) => {
    return [...repo, ++cur];
  }, []);
};
const addOneNotifyRead = (data) => {
  return data.reduce((repo, cur) => {
    return [...repo, 0];
  }, []);
};

const Message = () => {
  const {
    authState: { user },
  } = useContext(authContext);
  const deSocket = `${REACT_APP}/chat-namespace`;
  const [message, setMessage] = useState("");
  const [addMessageFromSoket, setAddMessageFromSoket] = useState(null);
  const scrollRef = useRef();

  const {
    messages,
    postMessageInConversation,
    setMessages,
    currentConversationId,
    conversations: { dataConversation },
    notifyHasNewMessage,
    sendSeenMessage,
    setDataNotifyMessage,
    dataNotifyMessage,
  } = useContext(chatContext);

  const { theme } = useContext(displayContext);
  const styleBackgroundChild = { background: theme.isDark? theme.dark.component.backgroundChild : theme.light.component.backgroundChild};

  useEffect(() => {
    chatSocket = io(deSocket, { transports: ["websocket"] });
    dataConversation &&
      dataConversation.forEach((con) => {
        chatSocket.emit("join-room", con._id);
      });
  }, [deSocket, dataConversation]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    chatSocket.on("get-message", (data) => {
      setAddMessageFromSoket({
        convId: data.room,
        newMessage: data.message,
      });
    });
  }, []);

  useEffect(() => {
    let runReturn = false;
    if (addMessageFromSoket !== null) {
      const { convId, newMessage } = addMessageFromSoket;
      let data;
      if (convId === currentConversationId) {
        runReturn = true;
        setMessages([...messages, newMessage]);
        data = dataNotifyMessage.reduce((repo, cur) => {
          if (cur.conversationId === convId)
            return [
              ...repo,
              { ...cur, messageNotify: addOneNotifyRead(cur.messageNotify) },
            ];
          return [...repo, cur];
        }, []);
      } else {
        data = dataNotifyMessage.reduce((repo, cur) => {
          if (cur.conversationId === convId)
            return [
              ...repo,
              { ...cur, messageNotify: addOneNotify(cur.messageNotify) },
            ];
          return [...repo, cur];
        }, []);
      }
      setDataNotifyMessage(data);
      setAddMessageFromSoket(null);
    }
    return () => {
      if (runReturn) {
        // sttUsers
        const conversationCurrent = dataConversation.find(
          (data) => data._id === currentConversationId
        );
        const sttUser = conversationCurrent.members.indexOf(user._id);
        (async ({ conversationId, sttUser }) => {
          await sendSeenMessage({ conversationId, sttUser });
        })({ conversationId: currentConversationId, sttUser });
      }
    };
  }, [addMessageFromSoket, currentConversationId]);

  const changeForm = (e) => {
    setMessage(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const conversationId = currentConversationId;
    const dataPushToSocketServer = {
      message,
      updatedAt: Date.now(),
      _id: Math.random(),
      senderId: user._id,
    };

    chatSocket.emit("push-message", {
      message: dataPushToSocketServer,
      room: conversationId,
    });
    setMessage("");

    try {
      const res = await postMessageInConversation({ message, conversationId });
      if (res.success) {
        const dataReturn = await notifyHasNewMessage(conversationId);
        if (dataReturn) {
           // sttUsers
          const conversationCurrent = dataConversation.find(
            (data) => data._id === currentConversationId
          );
          const sttUser = conversationCurrent.members.indexOf(user._id);
          await sendSeenMessage({ conversationId, sttUser });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="message-content">
        <div className="message-list">
          {messages?.length === 0 && (
            <h4>Hãy bắt đầu cuộc hội thoại với họ.</h4>
          )}
          {messages?.length !== 0 &&
            messages?.map((mes) => {
              return (
                <div
                  className={
                    mes.senderId === user._id
                      ? "message-item own"
                      : "message-item"
                  }
                  key={mes._id}
                  ref={scrollRef}
                >
                  <div className="messageImg">
                    <img alt="noAvt" src={noAvt} />
                  </div>
                  <div className="messageInfo">
                    <div className="messageText">{mes.message}</div>
                    <div className="messageTime">
                      {format(mes.updatedAt, "en_US")}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <form className="message-form" onSubmit={submitForm}>
        <textarea
          placeholder="Abc"
          name="message"
          value={message}
          onChange={changeForm}
          style={styleBackgroundChild}
        />
        <button type="submit" style={styleBackgroundChild}>chat</button>
      </form>
    </>
  );
};

export default Message;
