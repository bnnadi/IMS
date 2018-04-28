/*jslint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = {
    'host': process.env.DATABASE_URL,
    'database_name': process.env.DB_NAME,
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'dialect': process.env.DB_DIALECT,
    'port': process.env.DB_PORT,
    'language': 'en'
};

if (env === 'production') {
    config.logging = false;
    // config.dialectOptions = {
    //     ssl:'Amazon RDS'
    // };
    config.pool = {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000,
        autostart: true
    };
}

var sequelize = new Sequelize(config.database_name, config.username, config.password, config);


var db = {},
dir = __dirname +'/'+ process.env.VERSION;

fs
    .readdirSync(dir)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(dir, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;