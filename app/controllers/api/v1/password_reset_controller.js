// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');
var jwt = require('jwt-simple');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

const db = require(BACKEND + '/models');
const uuidV4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

controller.start = (req, res, next) => {
    res.status(418);
    return;
};

controller.verify = (req, res, next) => {
    res.status(418);
    return;
};


module.exports = controller;