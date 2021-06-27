import React, { useContext } from "react";
import "./dashboard.css";
import { authContext } from "../../contexts/authContext";


const Dashboard = ({user}) => {
  const { userLogout } = useContext(authContext);
  return (
      <div className="dashboard">
        <ul className="dashboard_header">  
          <li>Xin chào: {user.name}</li>
          <li className='logout' onClick={userLogout}>Logout</li>
        </ul>
        <div className="dashboard_content">
            <h1>WELCOME TO MY APP</h1>
        </div>
      </div>
   
  );
};

export default Dashboard;
