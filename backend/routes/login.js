var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	let query = 'SELECT * FROM `Users` WHERE Username = ? AND UserPassword = ? '
	let result = Object.values(req.body);
	req.app.locals.db.query(query, result , (err, result) => {
		if(result.length < 1 || result == undefined) {
			res.status(500).send('Something broke!')
		} else {
			res.send(result);
		}
	});
});

module.exports = router;