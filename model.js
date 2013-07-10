var Sequelize = require("sequelize-mysql").sequelize;
var mysql = require('sequelize-mysql').mysql;

var ip = process.env.IP || "localhost";

var sequelize = new Sequelize('wifistore', 'wifistore','test', {
    host: ip,
    port: 3306
});

var AccessPoint = sequelize.define('access_point', {
    store_name: Sequelize.STRING,
    location: Sequelize.STRING,
    ssid: Sequelize.STRING,
    password: Sequelize.STRING,
    latitude: {
        type: Sequelize.DECIMAL(10,8),
        allowNull: true,
        defaultValue: null,
        validate: {
            min: -90,
            max: 90,
        }
    },
    longitude: {
        type: Sequelize.DECIMAL(10,8),
        allowNull: true,
        defaultValue: null,
        validate: {
            min: -180,
            max: 180,
        }
    },
});

var User = sequelize.define('user', {
    name: Sequelize.STRING,
    password: Sequelize.STRING

});

var APUpdate = sequelize.define('ap_update', {
   when: Sequelize.DATE 
});

AccessPoint.hasOne(APUpdate);
User.hasOne(APUpdate);

//sequelize.drop();
sequelize.sync();

exports.AccessPoint = AccessPoint;
exports.User = User;
exports.APUpdate = APUpdate;
