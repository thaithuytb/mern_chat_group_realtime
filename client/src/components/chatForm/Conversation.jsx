import React, { useContext, useEffect } from "react";
import { chatContext } from "../../contexts/chatContext";
import { authContext } from "./../../contexts/authContext";
import { setShowConversations } from "./../../utils/setShowConversations";
import { checkTwoArr } from "../../utils/checkTwoArr";
import noAvt from "../../assets/noAvt.png";
const Conversation = () => {
  const {
    authState: { user },
    listUserIdOnline,
    allUser,
  } = useContext(authContext);
  const {
    conversations: { dataConversation },
    getAllMessage,
    dataNotifyMessage,
  } = useContext(chatContext);
 

  const getMessageInConversation = async (conversationId) => {
    try {
      await getAllMessage(conversationId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const findNotifyAndUserInConversation = (conversation) => {
    const sttUser = conversation.members.indexOf(user._id);
    return dataNotifyMessage.find((data) => data.conversationId === conversation._id).messageNotify[sttUser];
  };
  return (
    <>
      {dataNotifyMessage === null ? (
        <></>
      ) : (
        dataConversation.map((conversation) => {
          const { members } = conversation;
          // số thông báo
          const notify = findNotifyAndUserInConversation(conversation);
          // get id
          const myfriends = allUser?.reduce((repo, cur) => {
            return cur._id !== user._id && members.indexOf(cur._id) >= 0
              ? [...repo, cur.name]
              : repo;
          }, []);
          //get id
          const myListId = allUser?.reduce((repo, cur) => {
            return cur._id !== user._id && members.indexOf(cur._id) >= 0
              ? [...repo, cur._id]
              : repo;
          }, []);
          return (
            <div
              className="conversation-item"
              key={conversation._id}
              onClick={() => getMessageInConversation(conversation._id)}
            >
              <div className="conversationImg">
                <span
                  className={
                    checkTwoArr(myListId, listUserIdOnline)
                      ? "conversationStatus"
                      : "conversationStatus true"
                  }
                />
                <img src={noAvt} alt="noAvt" />
              </div>
              <div className="conversationText">    
                <span className="conversationText-name">{setShowConversations(myfriends)}</span>
                <span className={notify=== 0 ? "conversationText-notify-none" : "conversationText-notify"}>{notify}</span>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Conversation;
