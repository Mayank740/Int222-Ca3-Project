/* eslint-disable no-var */
var express = require('express'),
	app = express(),
	http = require('http'),
	socketIo = require('socket.io')(server, {
		handlePreflightRequest: (req, res) => {
			const headers = {
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Access-Control-Allow-Origin': req.headers.origin,
				'Access-Control-Allow-Credentials': true,
			};
			res.writeHead(200, headers);
			res.end();
		},
	});

var server = http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);
app.use(express.static(__dirname + '/client'));
console.log('Server');

const userList = {};
const line_history = [];

const checkMsg = function(chat, user) {
	console.log(chat.toLowerCase);
	if (
		chat
			.toLowerCase()
			.replace(/[\s.\\/,+\-'";:><|=\][{}()*&^%$#@!~`1234567890?]+/g, '') ==
		'dog'
	) {
		return {
			chat: user.name + ' guessed the word!',
			user: {
				name: 'Admin',
			},
			accent: 'green',
		};
	} else {
		return {
			chat: chat,
			user: user.name,
			accent: user.accent,
		};
	}
};

io.on('connection', function(socket) {
	console.log(Object.keys(io.sockets.sockets));
	let useradd = false;
	socket.on('add user', (user, created) => {
		if (useradd) return;
		if (!(user.name in userList)) {
			userList[user.name] = user;
			console.log(userList);
			socket.username = user.name;
			useradd = true;
			created(true);
			io.emit('userlist', userList);
			io.emit(
				'chat',
				user.name + ' has joined the room!',
				{ name: 'Admin' },
				user.accent,
			);
		} else {
			created(false);
		}
		socket.on('disconnect', () => {
			delete userList[socket.username];
			io.emit('userlist', userList);
			console.log(userList);
		});
	});

	socket.on('chat', (chat) => {
		console.log(chat);
		const msgComp = checkMsg(chat, userList[socket.username]);
		io.emit('chat', msgComp.chat, msgComp.user, msgComp.accent);
	});

	socket.on('draw_line', function(data) {
		line_history.push(data.line);
		io.emit('draw_line', { line: data.line });
	});
});

/*
var countDownDate = new Date().getTime()+52000;
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);

*/
