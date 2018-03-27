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

var UserModel = db.employee;
var AddressModel = db.address;
var PhoneModel = db.phone_number;
var OrganizationModel = db.organization;
var OrganizationUnitModel = db.organization_units;

controller.authenticate = (req, res, next) => {

    UserModel
        .findById(req.user.id)
        .then((result) => {
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
        .catch((err) => {
            console.log(nnLine, new Date());
            res.status(404);
            res.json({
                errors: err,
            });
            return;
        });

};

controller.readOne = (req, res, next) => {

    var user = req.user || {};

    var id = req.query.id || user.id;

    // validate the parameters
    var schema = jsSchema({
        id: /^[a-f\d]{24}$/i,
    });

    var invalid = schema.errors({
        id: id
    });

    if (invalid) {
        
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
        .then((user) => {
            res.json({
                result: user.toJSON()
            });
            return;
        }).catch((err) => {
            res.status(404);
            res.json({
                errors: err,
            });
            return;
        });
};

controller.updateOne = (req, res, next) => {

    var user = req.user || {};

    // validate the parameters
    var schema = jsSchema({
        id: Number,
    });

    var invalid = schema.errors({
        id: user.id
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

    var record = {};

    UserModel(record,{
            where: {
                employee_id: user.id
            },
            returning: true,
            paranoid: true,
            plain: true
        })
        .then((user) => {
            console.log(user);
            res.json({
                result: user
            });
            return;
        })
        .catch(err => {
            res.status(500);
            res.json({
                errors: err
            });
            return;
        });
};

controller.addAddress = (req, res, next) => {

    var user = req.user || {};


    var record = {};

    AddressModel
        .findOrCreate(record,{
            returning: true,
            paranoid: true,
            plain: true
        })
        .spread((address, created) => {
            console.log(address.get({plain: true}))
            console.log(created);
            res.json({
                result: address
            });
            return;
        })
};

controller.addPhoneNumber = (req, res, next) => {

    var user = req.user || {};

    var record = {};

    record.person_id = user.id;

    PhoneModel
        .findOrCreate(record,{
            returning: true,
            paranoid: true,
            plain: true
        })
        .spread((phone, created) => {
            console.log(phone.get({plain: true}))
            console.log(created)
            res.json({
                result: address
            });
            return;
        })
};

controller.updateAddress = (req, res, next) => {

    var user = req.user || {};
    var record = {},
    recordId;

    // record.address_line_1 = ;

    AddressModel
        .update(record, {
            where: {
                address_id: recordId,
                person_id: user.id
            },
            returning: true,
            paranoid: true,
            plain: true
        })
        .then((address) => {
            console.log(address);
            res.json({
                result: address
            });
            return;
        })
        .catch(err => {
            res.status(500);
            res.json({
                errors: err
            });
            return;
        });
};

controller.updatePhoneNumber = (req, res, next) => {

    var user = req.user || {};
    var record = {},
    recordId;

    // record.phone_number = ;

    PhoneModel
        .update(record, {
            where: {
                phone_number_id: recordId,
                person_id: user.id
            },
            returning: true,
            paranoid: true,
            plain: true
        })
        .then((phone) => {
            console.log(phone)
            res.json({
                result: phone
            });
            return;
        })
        .catch(err => {
            res.status(500);
            res.json({
                errors: err
            });
            return;
        })
};

controller.removeAddress = (req, res, next) => {

    var user = req.user || {};
    var record = {},
    recordId;

    record.where = {
        address_id: recordId,
        person_id: user.id
    }

    AddressModel
        .destory(record)
        .then(result => {
            res.status(204);
            return;
        })
        .catch(err => {
            res.status(500);
            res.json({
                errors: err
            });
            return;
        })
};

controller.removePhoneNumber = (req, res, next) => {

    var user = req.user || {};
    var record = {},
    recordId;

    record.where = {
        phone_number_id: recordId,
        person_id: id
    }

    PhoneModel
        .destory(record)
        .then(result => {
            res.status(204);
            return;
        })
        .catch(err => {
            res.status(500);
            res.json({
                errors: err
            });
            return;
        })
};

controller.before([
    '*'
], (req, res, next) => {

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