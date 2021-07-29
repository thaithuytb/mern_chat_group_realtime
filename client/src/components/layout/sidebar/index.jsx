import { displayContext } from "contexts/displayContext";
import React, { useContext, useState } from "react";
import { AiFillWechat as IconChat } from "react-icons/ai";
import { BiMenu as IconMenu, BiX as IconClose } from "react-icons/bi";
import { FcMultipleDevices as IconDashboard, FcViewDetails as IconDiary } from "react-icons/fc";
import { Link } from "react-router-dom";
import "./sidebar.css";

const SideBar = () => {
  const [isShow, setIsShow] = useState(true);
  const { setIsShowChangeInfo, theme, setShowDetail, showDetail} = useContext(displayContext);
  const style = theme.isDark ? theme.dark.sidebar : theme.light.sidebar;
  return (
    <>
      <div style={style} className={isShow ? "sidebarShow" : "sidebarHidden"} onClick={() => {
        setIsShowChangeInfo(false);
        showDetail !== 0 && setShowDetail(0);
      }}>
        <div className="icon-toggle">
          {isShow ? (
            <IconClose onClick={() => setIsShow(!isShow)} />
          ) : (
            <IconMenu onClick={() => setIsShow(!isShow)} />
          )}
        </div>
        <ul className="list-sidebar">
          <li className={theme.isDark ? "list-sidebar-true" : "list-sidebar-false"}>
            <Link to="/dashboard">
              <IconDashboard className="list-sidebar-icon" />
            </Link>
          </li>
          <li className={theme.isDark ? "list-sidebar-true" : "list-sidebar-false"}>
            <Link to="/diary">
              <IconDiary className="list-sidebar-icon" />
            </Link>
          </li>
          <li className={theme.isDark ? "list-sidebar-true" : "list-sidebar-false"}>
            <Link to="/chat">
              <IconChat className="list-sidebar-icon" />
            </Link>
          </li>
        </ul>
      </div>
      <div className={isShow ? "list-sidebar-mock" : "list-sidebar-mock-none"}/>
    </>
  );
};

export default SideBar;
