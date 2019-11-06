import '../css/App.css';
import Login from './Login';
import SignUp from './SignUp';
import logo from '../assets/logo.jpg';
import React, { Component } from 'react';
import MessageInput from './MessageInput';
import { getChatHistory, socket } from '../api/chatApi';

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			username: '',
			islogin: true,
			isSignUp: false,
			isChat: false,
		}
		this.setUsername = this.setUsername.bind(this);
		this.switchBetweenComponents = this.switchBetweenComponents.bind(this);
	}

	componentDidMount() {
		// Sets a socket listener as soon as the component is loaded
		socket.on('new message', newMessage => {
			var newChatHistory = [...this.state.messages, newMessage]
			this.setState({
				messages: newChatHistory,
				newMessage : newMessage
			})
		})
		// Retrieves chat history from database as soon as the component is loaded
		getChatHistory((err, response) => {
			var newChatHistory = [...this.state.messages]
			response.forEach(message => {
				newChatHistory.push(message)
			});
			this.setState({
				messages: newChatHistory
			})
		});
	}

	/**
	 * Set the username to be used between components 
	 * @param String username
	 */
	setUsername(username) {
		this.setState({
			username: username
		})
	}

	/**
	 * Switch states so components can be rendered
	 * @param String component
	 */
	switchBetweenComponents(component) {
		switch (component) {
			case 'login':
				this.setState(prevState => ({
					islogin: !prevState.islogin,
				}));
				break;
			case 'sign up':
				this.setState(prevState => ({
					isSignUp: !prevState.isSignUp
				}));
				break;
			case 'chat':
				this.setState(prevState => ({
					isChat : !prevState.isChat
				}));
				break;
			default:
				break;
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1> { process.env.REACT_APP_COMPANY_TITLE }</h1>
					<img src={logo} className="App-logo" alt="logo" />
					{ 
						this.state.islogin ?
						<Login
							setUsername = { this.setUsername }
							switch = { this.switchBetweenComponents }
						/> :
						null
					}
					{ 
						this.state.isSignUp ?
						<SignUp
							switch = { this.switchBetweenComponents }
						/> :
						null
					}
					{ 
						this.state.isChat ?
						<MessageInput
							emitMessage = { this.emitMessage } 
							username = { this.state.username } 
							newMessage = { this.state.newMessage }
							messages = { this.state.messages }
						/> :
						null
					}
				</header>
			</div>
		);	
	}
}

export default App;
