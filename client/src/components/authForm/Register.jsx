import React from "react";
import { Link } from 'react-router-dom';
import { Form } from "react-bootstrap";
import { FiLock, FiUser } from "react-icons/fi";

import './style.css';
const RegisterForm = () => {
  return (
    <div className='authFrom'>
      <h3>REGISTER</h3>
      <Form>
        <Form.Group className='formGroup'>
          <label for="username">
            <FiUser />
          </label>
          <input
            type="text"
            placeholder="username"
            name="username"
            id="username"
          />
        </Form.Group>
        <Form.Group className='formGroup'>
          <label for="password">
            <FiLock />
          </label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />
        </Form.Group>
        <button>submit</button>
      </Form>
      <div className='redirectFrom'>Do you already have an account? <Link to='/login'>Login</Link></div>
    </div>
  );
};

export default RegisterForm;
