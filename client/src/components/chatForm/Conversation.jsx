import React, { useContext, useEffect } from "react";
import { chatContext } from "../../contexts/chatContext";
import { setShowConversations } from "./../../utils/setShowConversations";
import { checkTwoArr } from "../../utils/checkTwoArr";
import noAvt from "../../assets/noAvt.png";
const Conversation = ({ user, allUser, data, listUserIdOnline }) => {
  const { getAllMessage, getAllNotify, dataNotifyMessage } =
    useContext(chatContext);

  const getMessageInConversation = async (conversationId) => {
    try {
      await getAllMessage(conversationId);
    } catch (error) {
      console.log(error.message);
    }
  };
  // pull notifi in conversation
  useEffect(() => {
    const getArrmember = (data) => {
      return data.reduce((repo, cur) => {
        return [...repo, cur._id];
      }, []);
    };
    getAllNotify(getArrmember(data));
  }, [data]);

  // console.log(dataNotifyMessage);

  const findNotifyAndUserInConversation = (conversation) => {
    // console.log(members.indexOf(user._id));
    const sttUser = conversation.members.indexOf(user._id);
    return dataNotifyMessage.find((data) => data.conversationId === conversation._id).messageRead[sttUser];
  }

  return (
    <>
      {dataNotifyMessage === null ? (
        <></>
      ) : (
        data.map((conversation) => {
          const { members } = conversation;
          console.log(findNotifyAndUserInConversation(conversation), members);
          // findNotifyAndUserInConversation(conversation);
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
          // console.log(listUserIdOnline, myListId, myfriends, members, allUser, user);
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
                {setShowConversations(myfriends)}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Conversation;
