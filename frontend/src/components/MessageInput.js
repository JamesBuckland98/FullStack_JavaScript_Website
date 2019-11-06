import Chat from './Chat';
import React, { Component } from 'react';
import getWeather from '../api/weatherApi';
import { saveChatHistory, sendMessage } from '../api/chatApi';
import { geolocated } from "react-geolocated";
import { Formik, Form, Field, ErrorMessage, } from 'formik';

class MessageInput extends Component {

	constructor(props) {
		super(props)
		this.state = {
			weather : 0,
		}
	}

	componentDidUpdate(prevProps) {
		// https://reactjs.org/docs/react-component.html#shouldcomponentupdate
		// wrapped in a condition to stop infinite call to API
		if (this.props.coords !== prevProps.coords) {
			getWeather( this.props.coords.longitude ,  this.props.coords.latitude , (err, response) => {
				this.setState({
					weather: response.main.temp, 
				})
			});
		}
	}
	
	render() {
		return (
			<div>
				<p> 
					Welcome, { this.props.username } <br/>
					{ !this.props.isGeolocationAvailable ? <span> Your browser does not support Geolocation </span> : null }
				</p>

				<Chat 
					weather = { this.state.weather } 
					messages = { this.props.messages }
					username = { this.props.username }
				/>

				<Formik
				initialValues={{ChatMessage: '', Species: '', Abundance: '' }}
				validate= {
					values => {
						let errors = {};
						if ( values.file && values.file.type !== 'image/png') {
							errors.file = 'File must be a .png or .jpg'
						}
						if ( ! values.ChatMessage) {
							errors.ChatMessage = 'Required'
						}
						if( ! values.Species ) {
							errors.Species = 'Required'
						}
						if( ! values.Abundance) {
							errors.Abundance = ' Required'
						}
						return errors;
					}
				}

				onSubmit = {(values, { setSubmitting, resetForm }) => {
					setTimeout(() => {
						// Adds addition information before passing the value
						Object.assign(values, { 
							ChatTimeStamp : new Date().toISOString().slice(0, 19).replace('T', ' '),
							Username: this.props.username,
							Longitude: this.props.coords.longitude,
							Latitude: this.props.coords.latitude,
							Weather: this.state.weather,
						})
						setSubmitting(false);
						saveChatHistory(values);
						sendMessage(values);
					}, 400);
					// Resets to initial values
					resetForm({});
				}}
				>

				{({ isSubmitting, setFieldValue }) => (
					<Form className="main">
						<Field type="text" name="ChatMessage" placeholder = "Enter Title"></Field>
						<ErrorMessage name="ChatMessage" component="div" /> 
						<Field type="text" name="Species" placeholder="Enter Species"/>
						<ErrorMessage name="Species" component="div" /> 
						<Field type= "number" name="Abundance" placeholder="Enter Abundance"/>
						<ErrorMessage name="Abundance" component="div" /> 
						<input id="file" name="file" type="file" onChange={
							(event) => {
								setFieldValue("file", event.currentTarget.files[0]);
							}
						} className="form-control" />
						<ErrorMessage name="file" component="div" />
						<button type="submit" disabled={isSubmitting}>
						Submit
						</button>
					</Form>
				)}
				</Formik>
			</div>
		)
	}
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: null,
})(MessageInput);