import React, { useContext } from "react";
import { Redirect, Route, Link} from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import Loading from "../loading/Loading";
import Sidebar from "../view/sidebar";

import './appMain.css';

const ProtectRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isLoading, isAuthenticated, user },
  } = useContext(authContext);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <div className="wp">
            <Sidebar />
            <div className="content">
              <Component {...props} user={user} />
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
