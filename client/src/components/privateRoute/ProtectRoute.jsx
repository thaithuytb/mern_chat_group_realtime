import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { authContext } from "../../contexts/authContext";

const ProtectRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isAuthenticated },
  } = useContext(authContext);
  return (
    <Route
      rest
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectRoute;
