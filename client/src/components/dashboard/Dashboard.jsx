import assets from "constants/constantAssets";
import { REACT_APP } from "constants/constantReactApi";
import { authContext } from "contexts/authContext";
import { displayContext } from "contexts/displayContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./dashboard.css";
let userOnlineSocket;
const Dashboard = () => {
  const [isShowVideo, setIsShowVideo] = useState(true);
  const timeoutRef = useRef(null);
  const { setIsShowChangeInfo, showDetail, setShowDetail, theme } =
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
          <video src={assets.videoBackground} muted="" autoPlay="true" />
          <h1
            className={
              theme.isDark
                ? "dashboard-welcome-true"
                : "dashboard-welcome-false"
            }
          >
            <span className="dashboard-welcome-span">W</span>ELCO
            <span>ME T</span>O MY APP
          </h1>
        </>
      ) : (
        <>
          <div className="dashboardMain">
            <h1
              className={
                theme.isDark
                  ? "dashboard-welcome-after-true"
                  : "dashboard-welcome-after-false"
              }
            >
              <span className="dashboard-welcome-span">W</span>ELCO
              <span>ME T</span>O MY APP
            </h1>
            <h2>NGÔ QUANG THÁI</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
