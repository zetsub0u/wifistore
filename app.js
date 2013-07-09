var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var model = require(__dirname + "/model.js");

var port = process.env.PORT || 8080;

server.listen(port, function() {
    console.log("--- app.listen");
});

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set("view options", {
        layout: false,
        pretty: true
    });
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.favicon());
    app.use(express.static(__dirname + '/public'));
});

io.sockets.on('connection', function(socket) {
    console.log("--- io.sockets.on connection");
});

module.exports.app = app;
module.exports.model = model;
require(__dirname + "/controller.js");