import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FiLock, FiUser } from "react-icons/fi";
import { authContext } from "../../contexts/authContext";

import "./style.css";
const RegisterForm = () => {
  const [checkFormRegister, setCheckFormRegister] = useState({
    comfirmPasswordCorrect: true,
  });
  const [inforUser, setInforUser] = useState({
    username: "",
    password: "",
    name: "",
    comfirmPassword: "",
  });
  const [ dataFromServer,setDataFromServer] = useState(null);
  const { username,name, password, comfirmPassword } = inforUser;
  const { comfirmPasswordCorrect } = checkFormRegister;
  
  const {
    userRegisterForm,
    authState: { isAuthenticated },
  } = useContext(authContext);
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onChangeValueUser = (e) => {
    setInforUser({ ...inforUser, [e.target.name]: e.target.value });
  };
  //funtion submit
  const userSubmitForm = async (e) => {
    e.preventDefault();
    if ( password === comfirmPassword ) {
      setCheckFormRegister({
        ...checkFormRegister,
        comfirmPasswordCorrect: true,
      });
      try {
        const res = await userRegisterForm({ username,name, password });
        if (!res.success) {
          setDataFromServer(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setCheckFormRegister({
        ...checkFormRegister,
        comfirmPasswordCorrect: false,
      });
    }
  };
  return (
    <div className="authFrom">
      <h3>REGISTER</h3>
      { dataFromServer && <p>{dataFromServer}</p>}
      <Form onSubmit={userSubmitForm}>
        <Form.Group className="formGroup">
          <label>
            <FiUser />
          </label>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={onChangeValueUser}
          />
        </Form.Group>
        <Form.Group className="formGroup">
          <label>
            <FiUser />
          </label>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={onChangeValueUser}
          />
        </Form.Group>
        <Form.Group className="formGroup">
          <label>
            <FiLock />
          </label>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={onChangeValueUser}
          />
        </Form.Group>
        <Form.Group className="formGroup">
          <label>
            <FiLock />
          </label>
          <input
            type="password"
            placeholder="comfirm password"
            name="comfirmPassword"
            value={comfirmPassword}
            onChange={onChangeValueUser}
          />
        </Form.Group>
        {comfirmPasswordCorrect === false ? (
          <p>Confirmation password is incorrect</p>
        ) : (
          <p style={{ display: "none" }}>Confirmation password is obligatory</p>
        )}
        <button type="submit">submit</button>
      </Form>
      <div className="redirectFrom">
        Do you already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
