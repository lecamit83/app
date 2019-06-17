import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
function App() {
  return (
    <Router>
    	<div>
    		<ul>
    			<li>
    				<Link to={"/"}>Login</Link>
    			</li>
    			<li>
    				<Link to={"/home"}>Home</Link>
    			</li>
    		</ul>
    		<Route exact path="/" component={Login}/>
    		<Route path="/home" component={Home} />
    	</div>
    </Router>  
  );
}

export default App;
