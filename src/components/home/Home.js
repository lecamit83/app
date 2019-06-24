import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
			conversationId : '',
		}
		this.logOut = this.logOut.bind(this);
		this.navigateToLogin = this.navigateToLogin.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.replyMessage = this.replyMessage.bind(this);
		this.onChangeId = this.onChangeId.bind(this);
		this.init = this.initFetch.bind(this);
		this.init();
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
						<div style={{display: "flex", flexDirection : 'column' }}>
						{
							conversations.map(conversation => <button style={{margin : 8}} key={conversation._id} onClick={this.onChangeId(conversation._id)}>{conversation.participants[0].name}</button>)
						}
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
	onChangeId(value){
		const { conversationId, token } = this.state;
		if(value !== conversationId){
			return async ()=>{
				let response = await axios.get(URL + "/chat/" + value , { headers: { "Authorization" : "Bearer " + token.token }});
				if(response.data.status === 200){
					this.setState({messages : response.data.messages});
				}
				this.setState({conversationId : value});
			};
		}
		
	}
	onChangeText(event){
		this.setState({contentMessage : event.target.value});
	}
	replyMessage(){
		const { token, contentMessage, conversationId } = this.state;
		axios.post(URL + '/chat/' + conversationId ,{
			contentMessage
		},{
			headers : {
				"Authorization" : "Bearer " + token.token,
				"Content-Type" : "application/json"
			}
		}).then(res=>{
			console.log(res);
			this.setState({contentMessage : ''});
		});
	}
	componentDidMount(){
	
	}

	async initFetch(){
		const { token } = this.state;
		let conversations = await axios.get(URL + "/chat" , { headers: { "Authorization" : "Bearer " + token.token }});
		if(conversations.status === 200) {
			this.setState({
				conversations : conversations.data,
				conversationId : conversations.data[0]._id
			});
		}
		const { conversationId } = this.state;

		let response = await axios.get(URL + "/chat/" + conversationId , { headers: { "Authorization" : "Bearer " + token.token }});
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