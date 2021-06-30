import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiMenu as IconMenu } from "react-icons/bi";
import { BiX as IconClose } from "react-icons/bi";
import { FcKindle as Diary } from "react-icons/fc";
import { FcMultipleDevices as Dashboard } from "react-icons/fc";

const SideBar = () => {
  const [isShow, setIsShow] = useState(true);
  return (
    <>
      <div className={isShow ? "sidebarShow" : "sidebarHidden"}>
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
        </ul>
      </div>
      <div className={isShow ? "list-sidebar-mock" : "list-sidebar-mock-none"}/>
    </>
  );
};

export default SideBar;
