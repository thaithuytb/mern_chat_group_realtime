import React, { useContext, useState, useRef, useEffect} from "react";
import { chatContext } from "../../contexts/chatContext";
import Loading from "./../loading/Loading";
import { format } from "timeago.js";
import noAvt from "../../assets/noAvt.png";

const Message = ({ user }) => {
  const [ message, setMessage ] = useState('');
  const scrollRef = useRef();
  const {
    messages: { isLoading, dataMessage },
    postMessageInConversation,
    setMessages,
    currentConversationId
  } = useContext(chatContext);
  useEffect(()=> {
    scrollRef.current?.scrollIntoView({ behavior: "smooth"});
  }
  ,[dataMessage])

  if (dataMessage === null && isLoading===false) {
    return <div>Chọn 1 cuộc hội thoại để bắt đầu.</div>;
  }  
  if (isLoading) {
    return <Loading />;
  }
  

  const changeForm = (e) => {
      setMessage(e.target.value);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const conversationId = currentConversationId;
    try {
        const data = await postMessageInConversation({message, conversationId});
        if (data.success) {
          const { newMessage } = data;
          setMessage('');
          setMessages({
            isLoading: false,
            dataMessage: [ ...dataMessage, newMessage]
          })
        }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className="message-content">
        <div className="message-list">
          { dataMessage?.length === 0 && <h4>Hãy bắt đầu cuộc hội thoại với họ.</h4>}
          { dataMessage?.map((mes) => {
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
                  <div className="messageTime">{format(mes.updatedAt, 'en_US')}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <form className="message-form" onSubmit={submitForm}>
        <textarea placeholder="   Abc" name="message" value={message} onChange={changeForm}/>
        <button type='submit'>chat</button>
      </form>
    </>
  );
};

export default Message;
