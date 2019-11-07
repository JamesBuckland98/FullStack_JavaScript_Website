import '../css/Login.css'
import login from '../api/loginApi';
import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			responseText: '',
		}
	}
	render() {
		return (
			<div>
				<p> { this.state.responseText } </p>
				<h3> Login: </h3>
				<Formik
					initialValues={{ username : '', password: '' }}
					validate= {
						values => {
							let errors = {};
							if (!values.username) {
								errors.username = 'Required';
							}
							if (!values.password) {
								errors.password = 'Required';
							}
							return errors;
						}
					}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							login(values, (err, data) => {
								if (data instanceof Object) {
									this.props.setUsername(data.Username)
									this.props.switch('login')
									this.props.switch('chat')
								} else {
									this.setState({
										responseText: 'Incorrect username or password'
									})
								}
							});
							setSubmitting(false);
						}, 400);
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<label> Username: </label> <br/>
							<Field type='text' name='username' />
							<ErrorMessage name='username' component='div' />
							<br/>
							<label> Password: </label> <br/>
							<Field type='password' name='password' />
							<ErrorMessage name='password' component='div' />
							<br/>
							<button type='submit' disabled={isSubmitting}>
								Submit
							</button>
						</Form>
					)}
				</Formik>
				<button className='link' onClick= {() => {
					this.props.switch('login'); 
					this.props.switch('sign up');
				}}>
					Sign Up
				</button>
			</div>
		)
	}
}

export default Login;