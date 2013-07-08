var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var ip = process.env.PORT || "0.0.0.0";
var port = process.env.PORT || 8080;

server.listen(port, function() {
    console.log("--- app.listen");
});

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set("view options", { layout: false, pretty: true });
    app.use(express.favicon());
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(request, response) {
    response.render('index.jade');
});

io.sockets.on('connection', function(socket) {
    console.log("--- io.sockets.on connection");
});