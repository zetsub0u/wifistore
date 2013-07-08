var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var model = require(__dirname + "/model.js")

var ip = process.env.IP || "0.0.0.0";
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
    app.use(express.favicon());
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.get('/accesspoint', function(req, res) {
    var store_name = req.query.store_name;
    var ssid = req.query.ssid;
    var password = req.query.password;
    var lat = req.query.latitude;
    var lon = req.query.longitude;

    console.log({
        store_name: store_name,
        ssid: ssid,
        password: password,
        latitude: lat,
        longitude: lon
    });

    var ap = model.AccessPoint.create({
        store_name: store_name,
        ssid: ssid,
        password: password,
        latitude: lat,
        longitude: lon
    }).success(function(ap) {
        console.log(ap.values);
    });
    res.send('Done!');
});

app.get('/user', function(req, res) {
    var newUser = model.User.create({
        name: 'testuser',
        password: '12345'
    }).success(function(user) {
        console.log(user.values);
    });
    res.send('User Create');
});

io.sockets.on('connection', function(socket) {
    console.log("--- io.sockets.on connection");
});