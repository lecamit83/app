import React from 'react';
import Login from '../login/Login';
import Register from '../register/Register';

import { Route, Link , Switch , withRouter } from 'react-router-dom';

function LoginScreen(props){
	return(
		<div>
			<ul>
    			<li>
    				<Link to={"/"}>Login</Link>
    			</li>
    			<li>
    				<Link to={"/sign-up"}>Register</Link>
    			</li>
    		</ul>

    		<Switch>
	    		<Route exact path="/" component={Login} />
	    		<Route exact path="/sign-up" component={Register} />
	    		<Route component={Login}/>
    		</Switch>
		</div>	
	);
}

export default withRouter(LoginScreen);