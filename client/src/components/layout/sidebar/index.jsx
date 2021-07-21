import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BiMenu as IconMenu } from "react-icons/bi";
import { BiX as IconClose } from "react-icons/bi";
import { FcKindle as Diary } from "react-icons/fc";
import { FcMultipleDevices as Dashboard } from "react-icons/fc";
import { AiFillWechat as Chat } from "react-icons/ai";
import { displayContext } from './../../../contexts/displayContext';
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
          <li>
            <Link to="/dashboard">
              <Dashboard />
            </Link>
          </li>
          <li>
            <Link to="/diary">
              <Diary />
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <Chat />
            </Link>
          </li>
        </ul>
      </div>
      <div className={isShow ? "list-sidebar-mock" : "list-sidebar-mock-none"}/>
    </>
  );
};

export default SideBar;
