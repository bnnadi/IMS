// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');
var jwt = require('jwt-simple');
var generatePsswrd = require('password-generator');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var db = require(BACKEND + '/models');

var UserModel = db.user;
var AddressModel = db.address;
var PhoneModel = db.phone_number;

controller.authenticate = function(req, res, next) {

    UserModel
        .findById(req.user.id)
        .then(function(result) {
            var user = {
                id: result.id,
                accountType: result.accountType,
                exp: process.env.JWT_KEY_TTL
            };

            var token = jwt.encode(user, process.env.JWT_KEY, process.env.JWT_KEY_ALGOR);

            delete user.exp;

            user.token = token;
            user.email = result.email;
            user.name = result.getFullName();
            user.profile_img = '';
            user.access = (result.companyId = 0) ? 'full' : '';

            res.json({
                result: user
            });
            return;
        })
        .catch(function(err) {
            console.log(nnLine, new Date());
            res.status(404);
            res.json({
                errors: err,
            });
            return;
        });

};

controller.readOne = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var id = req.query.id || user.id;

    // validate the parameters
    var schema = jsSchema({
        id: Number,
    });

    var invalid = schema.errors({
        id: id
    });

    if (invalid) {

        var errors = ['NNC-01001'];
        // res.nnBunyan(errors);
        console.log(nnLine, new Date());
        res.status(400);
        res.json({
            errors: invalid,
        });
        return;

    }

    UserModel
        .findById(id)
        .then(function(user) {
            res.json({
                result: user.toJSON()
            });
            return;
        }).catch(function(err) {
            res.status(404);
            res.json({
                errors: err,
            });
            return;
        });
};

controller.updateOne = function(req, res, next) {

    var user = req.user || {};
};

controller.addAddress = function(req, res, next) {

    var user = req.user || {};
};

controller.addPhoneNumber = function(req, res, next) {

    var user = req.user || {};
};

controller.updateAddress = function(req, res, next) {

    var user = req.user || {};
};

controller.updatePhoneNumber = function(req, res, next) {

    var user = req.user || {};
};

controller.removeAddress = function(req, res, next) {

    var user = req.user || {};
};

controller.removePhoneNumber = function(req, res, next) {

    var user = req.user || {};
};

controller.before([
    '*'
], function(req, res, next) {

    if (!req.isAuthenticated()) {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();

});

module.exports = controller;