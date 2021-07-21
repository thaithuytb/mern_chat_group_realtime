import React, { useEffect, useContext, useRef, useState } from "react";
import { authContext } from "./../../contexts/authContext";
import { displayContext } from "./../../contexts/displayContext";
import { io } from "socket.io-client";
import { REACT_APP } from "./../../config/constants";
import videoBackground from "./../../assets/videoBackground.mp4";
import "./dashboard.css";
let userOnlineSocket;
const Dashboard = () => {
  const [isShowVideo, setIsShowVideo] = useState(true);
  const timeoutRef = useRef(null);
  const { setIsShowChangeInfo, showDetail, setShowDetail } =
    useContext(displayContext);
  const {
    authState: { user },
    setListUserOnline,
  } = useContext(authContext);
  useEffect(() => {
    if (user) {
      userOnlineSocket = io(REACT_APP, { transports: ["websocket"] });
      userOnlineSocket.emit("send-user-info", user._id);
      userOnlineSocket.on("users-online", (users) => {
        // remove userId of myseft...
        const arrIdUsersOnline = users.reduce((repo, cur) => {
          return cur.userId === user._id ? repo : [...repo, cur.userId];
        }, []);
        setListUserOnline(arrIdUsersOnline);
      });
    }
  }, []);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsShowVideo(false);
    }, 7500);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <div
      className="dashboard"
      onClick={() => {
        setIsShowChangeInfo(false);
        showDetail !== 0 && setShowDetail(0);
      }}
    >
      {isShowVideo ? (
        <>
          <video src={videoBackground} muted="" autoPlay="true" />
          <h1 className="dashboard-welcome">
            <span className="dashboard-welcome-span">W</span>ELCO
            <span>ME T</span>O MY APP
          </h1>
        </>
      ) : (
        <>
          <h1 className="dashboard-welcome-after">
            <span className="dashboard-welcome-span">W</span>ELCO
            <span>ME T</span>O MY APP
          </h1>
          <h2>NGÔ QUANG THÁI</h2>
        </>
      )}
    </div>
  );
};

export default Dashboard;
