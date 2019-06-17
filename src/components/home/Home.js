import React , { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { removeStorage, getFromStorage } from '../../utils/storage';
import { TOKEN, USER_INFO } from '../../const';

function Home(props){

	const [token, setToken] = useState(getFromStorage(TOKEN) || '');

	return(
		<div>
			<h3>Home page</h3>
			<button type="button" onClick={logOut}>Log out</button>
		</div>
	);
	function logOut(){
		console.log(token.token);
		axios.post('http://localhost:5050/auth/logout',{},{
			headers : {
				"Authorization" : "Bearer " + token.token,
				"Content-Type" : "application/json"
			}
		}).then(res => {
			//console.log(res);
			removeStorage(TOKEN);
			removeStorage(USER_INFO);
			navigateToLogin();
		}).catch(error => {
			console.log(error);
		});
		
	}
	function navigateToLogin(){
		props.history.replace('/login');
	}
}

export default withRouter(Home);