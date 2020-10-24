const socket = io.connect('http://192.168.0.106:8080', {
	'force new connection': true,
	reconnectionAttempts: 'Infinity',
	timeout: 10000,
	transports: ['websocket'],
});
