var mongoose = require('mongoose');
var conf = require(__dirname + "/conf.js");
mongoose.connect('mongodb://'+ conf.db.host +'/' + conf.db.db);

// Updates definition
var updateSchema = mongoose.Schema({
    user_name: String,
    when: {
        type: Date,
        default: Date.now()
    },
});

// Access Point model definition
var apSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ssid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    geo: {
        type: [Number],
        index: '2d'
    },
    address: String,
    updates: [updateSchema]
});

apSchema.methods.findSameUser = function(cb) {
    return this.model('AccessPoint').find({
        user_name: this.user_name
    }, cb);
};

apSchema.methods.findNear = function(cb) {
    return this.model('AccessPoint').find({
        geo: {
            $nearSphere: this.geo,
            $maxDistance: 0.01
        }
    }, cb);
};

var AccessPoint = mongoose.model('AccessPoint', apSchema);

// User model definition
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

var User = mongoose.model('User', userSchema);

// Module exports
module.exports.AccessPoint = AccessPoint;
module.exports.User = User;