import axios from 'axios'

/**
 * Checks database if user exist.
 * If the user doesn't exist then it will return null
 * @param Object values
 * @param Function callback
 */
function checkLoginDetails(values,callback) {
	axios.post(process.env.REACT_APP_LOGIN_ENDPOINT , {
			Username : values.username,
			UserPassword : values.password,
		})
		.then((response) => {
			callback(null, response.data[0]);
		}).catch((error) => {
			callback(null, false);
		});
}

export default checkLoginDetails