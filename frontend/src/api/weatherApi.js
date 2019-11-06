import axios from 'axios';
const API_KEY = process.env.REACT_APP_OWM_API_KEY;

/**
 * Calls WeatherAPI to recieve weather based on location
 * @param Float longitude 
 * @param Float latitude 
 * @param Function callback 
 */
function getWeather(longitude, latitude, callback) {
	const uri = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&lon=' + longitude + '&units=metric&appid=' + API_KEY
	axios.get(uri)
	.then(function(response) {
		callback(null, response.data)
	})
}

export default getWeather;
