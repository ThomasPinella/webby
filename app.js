var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home', {
    title: 'Welcome'
    });
});

app.listen(3000);
