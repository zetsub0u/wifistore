var app = module.parent.exports.app;
var model = module.parent.exports.model;

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.get('/findNear', function(req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;
    model.AccessPoint.find({
        geo: {
            $near: [Number(lon), Number(lat)],
            $maxDistance: 0.01
        }
    }, function(error, aps) {
        console.log(aps);
        res.send(aps);
    });
});

app.get('/accesspoint', function(req, res) {
    var storeName = req.query.name;
    var ssid = req.query.ssid;
    var password = req.query.password;
    var lat = req.query.lat;
    var lon = req.query.lon;
    var userName = req.query.user_name;

    var user;

    model.User.find({
        name: userName
    }, function(err, dbUser) {
        //console.log(dbUser);
        if (user != []) {
            user = dbUser;
        }
        else {
            res.send("not found");
            return;
        }
    });

    var ap = new model.AccessPoint({
        name: storeName,
        ssid: ssid,
        password: password,
        geo: [Number(lon), Number(lat)],
        updates: [{
            user_name: userName,
            when: Date.now()
        }]
    });
    ap.save(function(err, ap) {
        if (err) {
            console.log('error: ' + err);
        }
        //console.log(ap);
    });

    res.send('Done!');
});

app.get('/login', function(req, res) {
    req.session.username = 'test1';
    req.session.email = 'test1@test1.com';
    res.send('logged in');
});

app.get('/session', function(req, res) {
    res.send(req.session);
});

app.get('/user', function(req, res) {

    var user = new model.User({
        name: 'testuser1',
        password: 'pass1'
    });
    user.save(function(err, user) {
        if (err) {
            console.log('error: ' + err);
        }
        console.log("user saved");
    });
    res.send('User Created');
});
