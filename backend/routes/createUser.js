var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	let query = 'INSERT INTO Users (Username, UserPassword) VALUES (?,?)'
	let result = Object.values(req.body);
	req.app.locals.db.query(query, result, (err, result) => {
		if (err) {
			next(err);
			return console.error(err.message);
		} else {
			res.send(result)
		}
		// get inserted rows
		console.log('Row inserted:' + result.affectedRows);
	})
})

module.exports = router;
