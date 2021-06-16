import React from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";

import './style.css';
const AuthForm = ({ component }) => {
  const mainForm = (
    <>{component === "login" ? <LoginForm /> : <RegisterForm />}</>
  );

  return <div className='bg'>{mainForm}</div>;
};

export default AuthForm;
