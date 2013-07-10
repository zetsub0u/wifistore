var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wifistore');

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
    updates: {
        user_name: String,
        when: Date,
    }
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