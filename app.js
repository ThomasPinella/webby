var express = require('express');
var ejs = require('ejs');
var app = express();

var clients = [];
var notes = [524, 493, 294, 440, 349, 330, 392, 262]; //262 294 330 349 392 440 493 523

app.set('port', (process.env.PORT || 5000));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home', {
	title: 'Welcome'
    });
});

app.get('/frequency', function(req, res) {
	res.sendStatus(notes.pop());
});

var server = app.listen(app.get('port'), function() {
	console.log('Node app is running on port: ' + app.get('port'));
});

var io = require('socket.io').listen(server);


io.on('connection', function(socket) {
	var client = {
		sock: socket,
		freq: notes[notes.length - 1]
	};
	clients.push(client);
	console.log('connected! ' + client.freq);
    socket.on('play', function(f) {
        io.emit('play', f);
    });
	socket.on('end', function(f) {
		io.emit('end', f);
	});
	
	socket.on('disconnect', function() {
		var lost = client.freq;
		clients.splice(clients.indexOf(client), 1);
		notes.push(lost);
		console.log('disconnected! ' + lost);
	});
});









