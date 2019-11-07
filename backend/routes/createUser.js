var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	let query = 'INSERT INTO Users (Username, UserPassword) VALUES (?,?)'
	let result = Object.values(req.body);
	req.app.locals.db.query(query, result, (err, result) => {
		if (err) {
			next(err);
		} else {
			res.send(result)
		}
	})
})

module.exports = router;
