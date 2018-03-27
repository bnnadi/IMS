#!/usr/bin/env nodejs

ROOT = __dirname;
CONFIG = __dirname + '/config';
BACKEND = __dirname + '/app';
FRONTEND = __dirname + '/public';
// core libs
var dotenv = require('dotenv').config();
var express = require('express');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');


var strings = require(CONFIG + '/values/strings');
var errors = require(CONFIG + '/values/errors');

process.values = process.values || {};
process.values.STRINGS = process.values.STRINGS || {};
process.values.ERRORS = process.values.ERRORS || {};

for (var key in strings) {
    process.values.STRINGS[key] = strings[key];
}
for (var key in errors) {
    process.values.ERRORS[key] = errors[key];
}

var sequelizeInit = require(ROOT + '/config/initializers/sequelize');
var passportInit = require(ROOT + '/config/initializers/passport');

var environmentsAll = require(ROOT + '/config/environments/all');
var environmentsDev = require(ROOT + '/config/environments/development');
var environmentsPro = require(ROOT + '/config/environments/production');

sequelizeInit(function() {
    passportInit();
});


var routes = require('./config/routes');

// create servers
var app = express();
var httpPort = process.env.HTTP_PORT;

if (process.env.NODE_ENV === 'development') {

    environmentsDev.call(app);
} else if (process.env.NODE_ENV === 'production') {
    environmentsPro.call(app);
}

environmentsAll.call(app);


var httpServer = http.createServer(app);

httpServer.listen(httpPort, function() {
    console.log('HTTP server listening on port ' + httpPort + ' and process ' + process.pid);
});


routes.call(app);