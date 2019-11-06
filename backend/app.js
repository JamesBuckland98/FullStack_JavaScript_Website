require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mysql = require('mysql');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var loginRouter = require('./routes/login');
var createUserRouter = require('./routes/createUser');
var chatHistoryRouter = require('./routes/chatHistory');

io.on('connection', (client) => {
	console.log('client connected')
	client.on('message', (msg) => {
		console.log('client is sending a message: ', msg)
		io.emit('new message', msg) // sends to everyone connected to the socket
	});
});

server.listen(process.env.WEBSOCKET_PORT);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE
});

db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('Connected to database');
});

// allows db to be used throughout the app
app.locals.db = db;

app.use('/login', loginRouter);
app.use('/create-user', createUserRouter);
app.use('/chatHistory', chatHistoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

server.listen(process.env.PORT, function(){
	console.log('listening on: ', process.env.PORT);
});

module.exports = app;
