var app = module.parent.exports.app;
var model = module.parent.exports.model;

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.get('/accesspoint', function(req, res) {
    var storeName = req.query.store_name;
    var ssid = req.query.ssid;
    var password = req.query.password;
    var lat = req.query.lat;
    var lon = req.query.lon;
    var userName = req.query.user_name;
    console.log(Number(lat));
    console.log(Number(lon));
    var user;
    model.User.find({ where: { name: userName }}).success(function(result) {
        console.log(result);
        if (result !== null) {
            user = result;
        } else {
            res.send("invalid user");
        }
    });

    model.AccessPoint.create({
        store_name: storeName,
        ssid: ssid,
        location: 'somewhere',
        password: password,
        latitude: Number(lat),
        longitude: Number(lon)
    }).success(function(ap) {
        console.log(ap.values);
    });
    res.send('Done!');
});

app.get('/user', function(req, res) {
    model.User.create({
        name: 'testuser',
        password: '12345'
    }).success(function(user) {
        console.log(user.values);
    });
    res.send('User Created');
});

app.get('/user2', function(req, res) {
    model.User.find({ where: { name: 'testuser' }}).success(function(result) {
        console.log(result);
    });
    res.send('encontre');
})
