var express = require('express');
var app     = express();
var server  = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

server.listen(33000);

app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});

app.get('/_', function(req, res) {
    res.sendfile('index_.html', {root: __dirname })
});