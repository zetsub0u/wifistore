var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var MongoStore = require('connect-mongo')(express);
var conf = require(__dirname + "/conf.js");
var model = require(__dirname + "/model.js");

server.listen(conf.server.port, function() {
    console.log("--- app.listen");
});

app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.session({
        secret: conf.session.secret,
        maxAge: new Date(Date.now() + 3600000),
        store: new MongoStore(conf.db)
    }));
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

module.exports.app = app;
module.exports.model = model;
module.exports.io = io;
require(__dirname + "/socket.js");
require(__dirname + "/controller.js");