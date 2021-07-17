import React, { useEffect, useContext } from "react";
import { authContext } from './../../contexts/authContext';
import { io } from "socket.io-client";
import { REACT_APP } from "./../../config/constants";
import "./dashboard.css";
let userOnlineSocket;
const Dashboard = () => {
  const { authState: {user} ,setListUserOnline} = useContext(authContext);
  useEffect(() =>{
    if (user) {
      userOnlineSocket= io(REACT_APP, { transports : ["websocket"]});
      userOnlineSocket.emit("send-user-info" , user._id);
      userOnlineSocket.on("users-online", (users) => {
        // remove userId of myseft...
        const arrIdUsersOnline = users.reduce((repo, cur) => {
          return  (cur.userId === user._id) ? repo :[...repo, cur.userId];
        }, []);
        setListUserOnline(arrIdUsersOnline);
      })
    }
  },[]);
  return (
    <div className="dashboard">
      <h1>WELCOME TO MY APP</h1>
    </div>
  );
};

export default Dashboard;
