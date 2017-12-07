// libraries
var _ = require('lodash');
var async = require('async');
var fs = require('fs');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var EmployeeModel = require(BACKEND + '/models').user;

controller.createOne = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var record = {};

    record.createdById = user.id;
    record.email = req.body.email;
    record.first_name = req.body.first_n;
    record.last_name = req.body.last_n;
    record.user_type = req.body.user_type;
    record.password = generatePsswrd();

    // phone number
    if (res.body.phone_number) {
        record.phone_numbers = [{
            number: res.body.phone_number
        }];
    }

    // address
    if (res.body.address) {
        record.addresses = [{
            address: res.body.address,
            city: res.body.city,
            state: res.body.state,
            country: res.body.country,
            zip: res.body.zip || null
        }];
    }

    EmployeeModel
        .findOrCreate({
            where: { email: record.email },
            defaults: record,
            attributes: ['id', 'email', 'user_type', 'last_name', 'first_name', 'createdAt'],
            include: [User.Address, User.Phone]
        })
        .spread(function(user, created) {
            res.json({
                result: user.toJSON()
            });
        });

};

controller.readOne = function(req, res, next) {

    var user = req.user || {};

};

controller.readMany = function(req, res, next) {

    var user = req.user || {};

    var limit, orderBy;
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

controller.generateQRCode = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var id = req.body.id;

    UserModel
        .findById(id)
        .then(function(user) {
            if (!user) {
                res.status(404);
                res.json({
                    errors: 'Record not Found',
                });
                return;
            }

            // TODO: add QR Code logic here
        })
        .catch(function(err) {
            res.status(404);
            res.json({
                errors: err,
            });
            return;
        });
};

controller.deleteOne = function(req, res, next) {

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

controller.before(['deleteOne'], function(req, res, next) {

    if (req.user.canDelete()) {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();
});

module.exports = controller;