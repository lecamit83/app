import React , { Component } from 'react';
import { NavLink , withRouter } from 'react-router-dom';
import axios from 'axios';

import { removeStorage, getFromStorage } from '../../utils/storage';
import { TOKEN, USER_INFO, URL } from '../../const';

import './Home.css';

class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			token : getFromStorage(TOKEN) || '',
			author : getFromStorage(USER_INFO) || {},
			conversations : [],
			messages : [],
			contentMessage : '',
		}
		this.logOut = this.logOut.bind(this);
		this.navigateToLogin = this.navigateToLogin.bind(this);
		this.init = this.initFetch.bind(this);
		this.init();
		this.onChangeText = this.onChangeText.bind(this);
		this.replyMessage = this.replyMessage.bind(this);
	}

	render(){
		const { conversations, messages, author, contentMessage } = this.state;
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
								{
									messages.map(function(message){
										if(message.author._id === author.user._id){
											return (
												<div className="message" key={message._id}>
													<div className="server">{message.body}</div>
												</div>
											)
										}else {
											return (
												<div className="message" key={message._id}>
													<div className="client">{message.body}</div>
												</div>
											)
										}
									})
								}
							</div>
						</div>
						<div className="footer-content">
							<div className="wrap-footer">
								<textarea type="text" className="input-text" value={contentMessage} onChange={this.onChangeText}></textarea>
								<button type="button" className="button-text" onClick={this.replyMessage}>Send</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	onChangeText(event){
		this.setState({contentMessage : event.target.value});
	}
	replyMessage(){
		
	}
	componentDidMount(){
	
	}

	async initFetch(){
		const { token } = this.state;

		let conversations = await axios.get(URL + "/chat" , { headers: { "Authorization" : "Bearer " + token.token }});
		if(conversations.status === 200) {
			this.setState({conversations : conversations.data});
		}

		let response = await axios.get(URL + "/chat/" + conversations.data[0]._id , { headers: { "Authorization" : "Bearer " + token.token }});
		if(response.data.status === 200){
			this.setState({messages : response.data.messages});
		}
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