var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const io = require('socket.io')(8080);

var app = express();

const rooms = {};


function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

io.on('connection', socket => {
	socket.emit('chat-msg', {message: 'Te-ai conectat la camera.', name: 'Really evolved AI'})
	socket.on('send-msg', (message, roomName) => {
		socket.to(roomName).broadcast.emit('chat-msg', {message: message, name: rooms[roomName].users[socket.id]});
	})
	socket.on('new-user', (name, roomName) => {
		socket.join(roomName);
		rooms[roomName].users[socket.id] = name;
		socket.to(roomName).broadcast.emit('user-connected', 'S-a conectat ' + name);
	})
	socket.on('disconnect', () => {
		getUserRooms(socket).forEach(room => {
			socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
			delete rooms[room].users[socket.id];
		})
	})
})

function getUserRooms(socket){
	return Object.entries(rooms).reduce((names, [name, room]) => {
		if(room.users[socket.id] != null) names.push(name);
		return names;
	}, [])
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async function(req, res, next){
	res.render('index', {
		title: 'Iahu',
		rooms
	})
})

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get('/room/:roomId', async function(req, res, next){
	var roomId = req.params.roomId;
	roomId = encodeHTML(roomId);
	var max = Object.keys(rooms).length;
	if(roomId == 'random' && max > 0){
		var keys = Object.keys(rooms);
		var rand = getRandomInt(max);
		roomId = keys[rand];
	}
	if(rooms[roomId] == null) return res.redirect('/');
	res.render('room', {
		title: 'Iahu camera',
		room: roomId
	})
})

app.post('/new', async function(req, res, next){
	var room = req.body.room;
	room = encodeHTML(room);
	room = room.split('/').join('');
	if(rooms[room] != null || room == 'random'){
		res.redirect('/?code=exist');
	}
	rooms[room] = {users: {}};
	io.emit('room-created', room);
	res.redirect('/room/' + room);

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
