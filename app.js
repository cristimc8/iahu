var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const io = require('socket.io')(8080);

var app = express();

const users = {};
const rooms = [];

io.on('connection', socket => {
	socket.emit('chat-msg', {message: 'Te-ai conectat la camera.', name: 'Really evolved AI'})
	socket.on('send-msg', message => {
		socket.broadcast.emit('chat-msg', {message: message, name: users[socket.id]});
	})
	socket.on('new-user', name => {
		users[socket.id] = name;
		socket.broadcast.emit('user-connected', 'S-a conectat ' + name);
	})
	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id]);
		delete users[socket.id];
	})
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async function(req, res, next){
	rooms.push({
		name: '12TBf'
	})
	res.render('index', {
		title: 'Iahu',
		rooms
	})
})

app.get('/room/:roomId', async function(req, res, next){
	var roomId = req.params.roomId;
	res.render('room', {
		title: 'Iahu camera',
		room: roomId
	})
})

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

module.exports = app;
