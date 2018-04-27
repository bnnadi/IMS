/*jslint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = {
    'database_name': process.env.DB_NAME,
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'dialect': process.env.DB_DIALECT,
    'port': process.env.DB_PORT
};

if (env === 'production') {
    config.logging = false;
    config.maxConcurrentQueries = 100;
    config.dialectOptions = {
        ssl:'Amazon RDS'
    };
    config.pool = {
        maxConnections: 5,
        maxIdleTime: 30
    };
    config.language = 'en';
}

if (env === 'production') {
    var sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
    var sequelize = new Sequelize(config.database_name, config.username, config.password, config);
}

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