import React , { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { removeStorage, getFromStorage } from '../../utils/storage';
import { TOKEN, USER_INFO } from '../../const';

import './Home.css';

function Home(props){

	const [token, setToken] = useState(getFromStorage(TOKEN) || '');

	return(
		<div className="container">
			<div className="box-chat">
				<div className="header-content">
					<div>
						<div>Home page</div>
						<button type="button" onClick={logOut}>Log out</button>
					</div>
				</div>
				<div className="content">
					<div>
						<div className="message">
							<div className="client">Chào anh!</div>
						</div>
						<div className="message">
							<div className="server">Anh cũng chào em!</div>
						</div>
						<div className="message">
							<div className="client">Anhdaskjdbsakbdksahdsahodhsadhsadhsaooddsadsadsadsasdassdasdsa anh!</div>
						</div>
						<div className="message">
							<div className="server">Anhdaskjdbsakbdksahdsahodhsadhsadhsaooddsadsadsadsasdassdasdsa!</div>
						</div>
					</div>
				</div>
				<div className="footer-content">
					<div className="wrap-footer">
						<textarea type="text" cols="50" rows="3" ></textarea>
						<button type="button">Send</button>
					</div>
				</div>
			</div>
		</div>
	);
	function logOut(){
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