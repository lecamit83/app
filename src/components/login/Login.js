import React, { useState } from 'react';
import './Login.css';

function Login() {
  return (
    <div className="container">
      <form className="form-login">
        <h3>Login</h3>
        <input className="text-field" placeholder="Email" type="email"/>
        <input className="text-field" placeholder="Password" type="password"/>
        <button className="btn-login" type="button">Login</button>
      </form>
    </div>  
  );
}

export default Login;
