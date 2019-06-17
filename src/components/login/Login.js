import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { getFromStorage , setInStorage } from '../../utils/storage';
import { TOKEN, USER_INFO } from '../../const';

import './Login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password , setPassword ] = useState('');
  
  useEffect(()=>{
    //componentDidMount
    
    const { token } = getFromStorage(TOKEN) || '';
    
    if(token && token !== null){
      navigateToHome();
    }
    return function cleanUp(){
      //componentUnMount
      
    }

  },[])

  return (
    <div className="container">
      <form className="form-login">
        <h3>Login</h3>
        <input className="text-field" placeholder="Email" type="email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
        <input className="text-field" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="btn-login" type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>  
  );

  function handleLogin(){
    let user = {
      email,
      password
    };

    axios.post('http://localhost:5050/auth/login', user)
      .then(res=>{
        let {token, user} = res.data;
        setInStorage(TOKEN,{token});
        setInStorage(USER_INFO, {user});
        navigateToHome();
      })
      .catch(err=>{});
  }
  function navigateToHome(){
    props.history.replace("/home");
  }
}

export default withRouter(Login);
