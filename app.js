var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home', {
	title: 'Welcome'
    });
});

var server = app.listen(app.get('port'), function() {
	console.log('Node app is running on port: ' + app.get('port'));
});

var io = require('socket.io').listen(server);

var count = 0;
io.on('connection', function(socket) {
	console.log('connected!');
	count++;
    socket.on('chat message', function(msg) {
        console.log('message' + msg);
        io.emit('chat message', msg);
    });
	socket.on('freq', function(freq) {
		io.emit('freq', freq);
	});
});
