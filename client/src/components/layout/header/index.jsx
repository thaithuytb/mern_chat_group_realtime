import React, { useContext } from "react";
import { authContext } from './../../../contexts/authContext';
import "./header.css";

const Header = ({user}) => {
  const { userLogout } = useContext(authContext);
  return (
      <div className="header">
        <ul className="header-nav">  
          <li>Xin chào: {user.name}</li>
          <li className='logout' onClick={userLogout}>Logout</li>
        </ul>
      </div>
   
  );
};

export default Header;
