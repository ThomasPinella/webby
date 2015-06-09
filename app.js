var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home', {
    title: 'Welcome'
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port: ' + app.get('port'));
}
