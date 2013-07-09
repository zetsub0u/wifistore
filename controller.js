var app = module.parent.exports.app;
var model = module.parent.exports.model;

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.put('/accesspoint', function(req, res) {
    var store_name = req.query.store_name;
    var ssid = req.query.ssid;
    var password = req.query.password;
    var lat = req.query.latitude;
    var lon = req.query.longitude;

    model.AccessPoint.create({
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

app.put('/user', function(req, res) {
    model.User.create({
        name: 'testuser',
        password: '12345'
    }).success(function(user) {
        console.log(user.values);
    });
    res.send('User Created');
});
