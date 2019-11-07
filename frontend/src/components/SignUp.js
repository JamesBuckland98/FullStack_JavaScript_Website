import '../css/Login.css'
import React, { Component } from 'react';
import createUser from '../api/creatUserApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class SingUp extends Component {

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
				<h3> Sign up: </h3>
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
							createUser(values, (err, response) => {
								if(response) {
									this.setState({
										responseText: 'User successfuly created'
									})
								} else {
									this.setState({
										responseText: 'Username already exist'
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
				<button className='link' onClick={()=> {
					this.props.switch('login');
					this.props.switch('sign up')
				}}> 
					Login 
				</button>
			</div>
		)
	}
}

export default SingUp;