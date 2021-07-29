import Header from "components/layout/header";
import SideBar from "components/layout/sidebar";
import Loading from "components/loading/Loading";
import { authContext } from "contexts/authContext";
import { displayContext } from "contexts/displayContext";
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
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
            <SideBar />
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
