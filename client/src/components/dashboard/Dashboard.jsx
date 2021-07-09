import React, { useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { REACT_APP } from "./../../config/constants";
import "./dashboard.css";
const Dashboard = ({ user }) => {
  const userOnline = useRef();
  useEffect(() =>{
    userOnline.current = io(REACT_APP, { transports : ["websocket"]});
    userOnline.current.emit("send-user-info" , user._id);
  },[user]);

  return (
    <div className="dashboard">
      <h1>WELCOME TO MY APP</h1>
    </div>
  );
};

export default Dashboard;
