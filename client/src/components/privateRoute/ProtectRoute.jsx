import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import Loading from "../loading/Loading";

const ProtectRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isLoading ,isAuthenticated, user },
  } = useContext(authContext);
  if (isLoading) {
    return <Loading />
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} user={user}/> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectRoute;
