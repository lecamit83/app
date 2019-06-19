import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { getFromStorage , setInStorage } from '../../utils/storage';
import { TOKEN, USER_INFO } from '../../const';

import './Register.css';

function Register(props) {
  const [name , setName ] = useState('');
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
      <form className="form-sign-up">
        <h3>Register</h3>
        <input className="text-field" placeholder="Name" type="text" value={name} onChange={(event)=>setName(event.target.value)}/>
        <input className="text-field" placeholder="Email" type="email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
        <input className="text-field" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="btn-login" type="button" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>  
  );

  function handleSignUp(){
    let user = {
      name,
      email,
      password
    };

    axios.post('http://localhost:5050/auth/register', user)
      .then(res=>{
        //console.table(res.data);
        if(res.data.status === 201){
          const { user , token } = res.data;
          setInStorage(TOKEN,{token});
          setInStorage(USER_INFO, {user});
          navigateToHome();
        }
      })
      .catch(err=>{
        console.error(err);
      });
  }
  function navigateToHome(){
    props.history.replace("/home");
  }
}

export default withRouter(Register);
