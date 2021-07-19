import React, { useContext } from "react";
import { chatContext } from "../../contexts/chatContext";
import { authContext } from "./../../contexts/authContext";
import { setShowConversations } from "./../../utils/setShowConversations";
import { checkTwoArr } from "../../utils/checkTwoArr";
import noAvt from "../../assets/noAvt.png";
import { getArrIdMembers } from "../../utils/getArrIdMember";
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
    sendSeenMessage,
    getAllNotify,
  } = useContext(chatContext);
 

  const getMessageInConversation = async (conversationId, dataNotify) => {
    try {
      if (dataNotify.notify !== 0) {
        const res = await sendSeenMessage({conversationId, sttUser: dataNotify.sttUser})
        if (res) {
          if (dataConversation) {
            getAllNotify(getArrIdMembers(dataConversation));
          }
        }
      }
      await getAllMessage(conversationId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const findNotifyAndUserInConversation = (conversation) => {
    const sttUser = conversation.members.indexOf(user._id);
    const notify = dataNotifyMessage.find((data) => data.conversationId === conversation._id)?.messageNotify[sttUser];
    return { notify, sttUser };
  };

  return (
    <>
      {dataNotifyMessage === null ? (
        <></>
      ) : (
        dataConversation.map((conversation) => {
          const { members } = conversation;
          // số thông báo
          const dataNotify = findNotifyAndUserInConversation(conversation);
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
              onClick={() => getMessageInConversation(conversation._id, dataNotify)}
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
                <span className={dataNotify.notify=== 0 ? "conversationText-notify-none" : "conversationText-notify"}>{dataNotify.notify}</span>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Conversation;
