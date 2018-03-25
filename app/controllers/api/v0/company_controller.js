// libraries
var _ = require('lodash');
var async = require('async');
var fs = require('fs');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var CompanyModel = require(BACKEND + '/models').company;

controller.createOne = function(req, res, next) {

    var user = req.user || {};

};

controller.readOne = function(req, res, next) {

    var user = req.user || {};

};

controller.readMany = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    CompanyModel
        .findAndCountAll()
        .then(function(companies) {
            res.json({
                result: companies
            });
            return;
        }).catch(function(err) {
            res.status(404);
            res.json({
                errors: errors,
            });
            return;
        });
};

controller.updateOne = function(req, res, next) {

    var user = req.user || {};

};

controller.deleteOne = function(req, res, next) {

    var user = req.user || {};

};

controller.before([
    '*'
], function(req, res, next) {

    if (!req.isAuthenticated() || !req.user.isManager()) {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();

});

controller.before([
    'deleteOne'
], function(req, res, next) {

    if (!req.user.canDelete()) {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();
});

module.exports = controller;