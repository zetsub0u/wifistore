var db = {
    db: 'wifistore',
    host: process.env.IP || 'localhost',
    //port: 6646,  // optional, default: 27017
    //username: 'admin', // optional
    //password: 'secret', // optional
    //collection: 'sessions' // optional, default: sessions
};
var session = {
    secret: 'secretkey',
};
var server = {
    ip: process.env.IP || 'localhost',
    port: process.env.PORT || 8080
};

module.exports.db = db;
module.exports.session = session;
module.exports.server = server;