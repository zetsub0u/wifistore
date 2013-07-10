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

    var user;

    model.User.find({
        name: userName
    }, function(err, dbUser) {
        console.log(dbUser);
        user = dbUser;
    });

    res.send('Done!');
});

app.get('/user', function(req, res) {

    var user = new model.User({
        name: 'testuser1',
        password: 'pass1'
    });
    user.save(function(err, user) {
        if (err) // TODO handle the error
        console.log("user saved");
    });
    res.send('User Created');
});

app.get('/user2', function(req, res) {
    model.User.find({
        where: {
            name: 'testuser'
        }
    }).success(function(result) {
        console.log(result);
    });
    res.send('encontre');
})
