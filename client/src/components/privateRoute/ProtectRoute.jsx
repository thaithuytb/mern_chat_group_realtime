import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { displayContext } from './../../contexts/displayContext';
import Loading from "../loading/Loading";
import Sidebar from "../layout/sidebar";
import Header from "../layout/header";

import "./appMain.css";

const ProtectRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isLoading, isAuthenticated },
  } = useContext(authContext);
  const { theme } = useContext(displayContext);
  if (isLoading) {
    return <Loading />;
  }
  const style = theme.isDark   ? theme.dark.component : theme.light.component;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <div className="wp">
            <Sidebar />
            <div className="content">
              <Header />
              <div style={style}>
              <Component
                {...props}
              />
              </div>  
            </div>
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectRoute;
