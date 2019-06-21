import React , { Component } from 'react';
import { Route, NavLink , Switch , withRouter } from 'react-router-dom';
import axios from 'axios';

import { removeStorage, getFromStorage } from '../../utils/storage';
import { TOKEN, USER_INFO, URL } from '../../const';

import './Home.css';

class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			token : getFromStorage(TOKEN) || '',
			conversations : [],
			messages : [],
		}
		this.logOut = this.logOut.bind(this);
		this.navigateToLogin = this.navigateToLogin.bind(this);
	}

	render(){
		const { conversations } = this.state;
		return(
			<div className="container">
				<div className="box">
					<div className="side-bar-friend">
						<div className="header-content">
							<div>List Friends</div>
						</div>
						<div>
						<ul>
						{
							conversations.map(conversation => <li key={`/chat/${conversation._id}`}><NavLink to={`${conversation._id}`}>{conversation.participants[0].name}</NavLink></li>)
						}
						</ul>
						</div>
					</div>
					<div className="box-chat">
						<div className="header-content">
							<div>
								<div>Home page</div>
								<button type="button" onClick={this.logOut}>Log out</button>
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
								<textarea type="text" className="input-text"></textarea>
								<button type="button" className="button-text">Send</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	async componentDidMount(){
		const { token } = this.state;

		let conversations = await axios.get(URL + "/chat" , { headers: { "Authorization" : "Bearer " + token.token }});
		if(conversations.status === 200) {
			this.setState({conversations : conversations.data});
		}

		let a = await axios.get(URL + "/chat/" + conversations.data[0]._id , { headers: { "Authorization" : "Bearer " + token.token }});
		console.log(a)
	}

	getConversations(){
		
		return 
	}

	logOut = () => {
		const { token } = this.state;
		axios.post(URL + '/auth/logout',{},{
			headers : {
				"Authorization" : "Bearer " + token.token,
				"Content-Type" : "application/json"
			}
		}).then(res => {
			//console.log(res);
			removeStorage(TOKEN);
			removeStorage(USER_INFO);
			this.navigateToLogin();
		}).catch(error => {
			console.log(error);
		});
		
	}
	navigateToLogin = () => {
		this.props.history.replace('/login');
	}
}

export default withRouter(Home);