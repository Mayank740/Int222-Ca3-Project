const socket = io.connect('http://localhost:8080', {
	'force new connection': true,
	reconnectionAttempts: 'Infinity',
	timeout: 10000,
	transports: ['websocket'],
});
