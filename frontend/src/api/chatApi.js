import openSocket from 'socket.io-client';
import axios from 'axios';

const socket = openSocket('http://localhost:3003');

/**
 * Websocket for sending a message
 * @param String msg 
 * @param Function callback 
 */
function sendMessage(msg) {
	socket.emit('message', msg)
}

/**
 * Function to retrieve  the chat history from the database
 * @param String URI 
 * @param Function callback 
 */
function getChatHistory(callback) {
	axios.get(process.env.REACT_APP_CHAT_HISTORY_ENDPOINT)
	.then(function(response){
		callback(null, response.data)
	})
}

/**
 * Function to save the new message to the database
 * @param Object newMessage 
 */
function saveChatHistory(newMessage) {
	if(newMessage !== undefined ) {
		axios.post(process.env.REACT_APP_CHAT_HISTORY_ENDPOINT, {
			Username : newMessage.Username,
			ChatMessage: newMessage.ChatMessage,
			Species: newMessage.Species,
			Abundance: newMessage.Abundance,
			ChatTimeStamp: newMessage.ChatTimeStamp,
			Longitude : newMessage.Longitude,
			Latitude : newMessage.Latitude,
			Weather: newMessage.Weather,
		})
	}
}

export { sendMessage, getChatHistory, saveChatHistory , socket }
