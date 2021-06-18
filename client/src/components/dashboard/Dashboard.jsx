import React, { useState, useContext } from "react";
import "./dashboard.css";
import { BiMenu as IconMenu } from "react-icons/bi";
import { BiX as IconClose } from "react-icons/bi";
import { authContext } from "../../contexts/authContext";


const Dashboard = ({user}) => {
  const [isShow, setIsShow] = useState(true);
  const { userLogout } = useContext(authContext);
  return (
    <div className="wp">
      <div className={ isShow ? "sidebarShow" : "sidebarHidden"}>
        <div className="icon">
          {isShow ? (
            <IconClose onClick={() => setIsShow(!isShow)} />
          ) : (
            <IconMenu onClick={() => setIsShow(!isShow)} />
          )}
        </div>
      </div>
      <div className="content">
        <div>Xin chào: {user.name}</div>
        <div className='logout' onClick={userLogout}>Logout</div>
      </div>
    </div>
  );
};

export default Dashboard;
