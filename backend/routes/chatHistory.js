var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	let query = 'INSERT INTO ChatHistory (Username, ChatMessage, Species, Abundance, ChatTimeStamp, Longitude, Latitude, Weather) VALUES (?,?,?,?,?,?,?,?)'
	result = Object.values(req.body);
	req.app.locals.db.query(query, result, (err, result, fields) => {
		if (err) {
		  return console.error(err.message);
		}
		// get inserted rows
		console.log('Row inserted:' + result.affectedRows);
	  });
})

router.get('/', function(req,res,next) {
	let query = 'SELECT * FROM ChatHistory'
	req.app.locals.db.query(query, (err, result) => {
		if (err) {
		  throw err;
		}
		res.send(result);
	  });

})

module.exports = router;