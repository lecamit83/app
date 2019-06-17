import React from 'react';
import { BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';
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
    		<Switch>
	    		<Route exact path="/" component={Login}/>
	    		<Route path="/home" component={Home} />
	    		<Route component={Login}/>
    		</Switch>
    	</div>
    </Router>  
  );
}

export default App;
