import React, { useContext, useState } from "react";
import { chatContext } from "../../contexts/chatContext";
import Loading from "./../loading/Loading";

const Message = ({ user }) => {
  const [ message, setMessage ] = useState('');
  const {
    messages: { isLoading, dataMessage },
    postMessageInConversation,
    currentConversationId
  } = useContext(chatContext);
  if (isLoading) {
    return <Loading />;
  }
  if (dataMessage === null) {
    return <div>Chọn 1 cuộc hội thoại để bắt đầu.</div>;
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
          setMessage('');
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
          {dataMessage?.map((mes) => {
            return (
              <div
                className={
                  mes.senderId === user._id
                    ? "message-item own"
                    : "message-item"
                }
                key={mes._id}
              >
                <div className="messageImg"></div>
                <div className="messageText">{mes.message}</div>
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
