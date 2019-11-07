import '../css/Chat.css'
import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

class Chat extends Component {

	componentDidMount() {
		this.scrollToBottom();
	}

	/**
	 * Method to scroll to the bottom message when component is mounted
	 * https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
	 */
	scrollToBottom() {
		this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
	}

	render() {
		return(
			<div>
				{
					this.props.messages.length > 0 ?
						<div>
							<ul> 
								{
									this.props.messages.map(message =>
										<li> 
											<i><b> { message.Username } : </b></i>
											<b> { message.ChatMessage } </b> <br/>
											<b> Species: { message.Species } </b> <br/>
											<b> Abundance: { message.Abundance} </b> <br/>
											<span> latitude : { message.Latitude }</span> 
											<span> longitude: { message.Longitude }</span>
											<span> Temp : { message.Weather }&deg;C </span>
											<i> 
											Date: { 
													new Date(message.ChatTimeStamp).toISOString().slice(0, 19).replace('T', ' ')
												} 
											</i>
										</li>
									)
								}
							</ul>
						</div>
						: null
				}
				<div 
					style={{ float:'left', clear: 'both' }}
					ref={(el) => { this.messagesEnd = el; }}
				/>
			</div>
		)
	}
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
})(Chat);