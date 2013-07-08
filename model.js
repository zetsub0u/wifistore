var Sequelize = require("sequelize-mysql").sequelize;
var mysql = require('sequelize-mysql').mysql;

var ip = process.env.IP || "localhost";

var sequelize = new Sequelize('wifistore', 'wifistore', 'te3lpi0c', {
    host: ip,
    port: 3306
});

var AccessPoint = sequelize.define('AccessPoint', {
    store_name: Sequelize.STRING,
    description: Sequelize.TEXT,
    location: Sequelize.TEXT,
    ssid: Sequelize.TEXT,
    password: Sequelize.TEXT,
    latitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
            min: -90,
            max: 90
        }
    },
    longitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
            min: -180,
            max: 180
        }
    },
}, {
    validate: {
        bothCoordsOrNone: function() {
            if ((this.latitude === null) === (this.longitude === null)) {
                throw new Error('Require either both latitude and longitude or neither');
            }
        }
    }
});

var User = sequelize.define('User', {
    name: Sequelize.TEXT,
    password: Sequelize.TEXT

});

AccessPoint.hasOne(User);
sequelize.sync();

exports.AccessPoint = AccessPoint;
exports.User = User;
