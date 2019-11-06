import axios from 'axios'

/**
 * Attempts to save the user to the database if the username is unique
 * @param Object values 
 * @param Function callback 
 */
function createUser(values, callback) {
	axios.post(process.env.REACT_APP_SIGN_UP_ENDPOINT, {
			Username : values.username, // Needs to be unique 
			UserPassword: values.password,
		}).then((response) => {
			// User doesn't exist
			callback(null, true)
		}).catch(() => {
			// User already exist
			callback(null, false)
		})
}

export default createUser