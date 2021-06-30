import React, { useState, useContext } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Form } from "react-bootstrap";
import { FiLock, FiUser } from "react-icons/fi";
import { authContext } from './../../contexts/authContext';
// import Loading from './../loading/Loading';
import './style.css';
const LoginForm = () => {
  const [ inforUser, setInforUser ] = useState({
    username: '',
    password: ''
  })
  const [ dataFromServer, setDataFromServer ] = useState(null);
  const {userLoginForm, authState: {isAuthenticated} } = useContext(authContext);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  const { username, password } = inforUser;
  //function onChangeValue
  const onChangeValueUser = (e) => {
    setInforUser({...inforUser, [e.target.name]: e.target.value});
  }
  //function userSubmitForm
  const userSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await userLoginForm({username, password});  
      if (!res.success) {
        setDataFromServer(res.message);
      } else {
        // history.push('/dashboard'); 
      } 
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='authFrom'>
    <h3>LOGIN</h3>
    { dataFromServer && <p>{dataFromServer}</p>}
    <Form onSubmit={userSubmitForm}>
      <Form.Group className='formGroup'>
        <label>
          <FiUser />
        </label>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={onChangeValueUser}
          value={username}
        />
      </Form.Group>
      <Form.Group className='formGroup'>
        <label>
          <FiLock />
        </label>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={onChangeValueUser}
          value={password}
        />
      </Form.Group>
      <button type='submit' className="button-auth">Sign in</button>
    </Form>
    <div className='redirectFrom'>Do you already have an account? <Link to='/register'>Register</Link></div>
  </div>
  );
};

export default LoginForm;


