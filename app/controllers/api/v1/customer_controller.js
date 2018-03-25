// libraries
var _ = require('lodash');
var async = require('async');
var fs = require('fs');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

const db = require(BACKEND + '/models');

var CustomerModel = db.customer;
var AddressModel = db.address;
var PhoneModel = db.phone_number;

controller.create = (req, res, next) => {
    var user = req.user || {};

    var record = options = {};

    record.email = req.body.email;
    record.first_name = req.body.first_name;
    record.last_name = req.body.last_name;
    record.company = req.body.company;
    record.other_details = req.body.other_details;

    CustomerModel
        .findOrCreate({
            where: { email: record.email },
            defaults: record,
            attributes: ['id', 'email', 'company', 'last_name', 'first_name', 'createdAt'],
            include: [Customer.Address, Customer.Phone]
        })
        .spread((customer, created) => {
            res.status(201)
            res.json({
                result: customer.get({plain: true})
            })
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

    CustomerModel
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

controller.readMany = (req, res, next) => {
    var user = req.user || {};

    var orderBy = req.query.orderBy;
    var limit = req.query.limit || 10;
    var offset = req.query.offset || 0;

    CustomerModel
        .findAndCountAll({
            subQuery: false,
            include: populate,
            order: orderBy,
            limit: limit,
            offset: offset,
        })
        .then(sheets => {
            res.json({
                result: sheets
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

    CustomerModel
        .create(record,{
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

    record.address_line_1 = ;

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

    record.phone_number = ;

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
    var record = {};

    record.where = {
        address_id: req.,
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
    var record = {};

    record.where = {
        phone_number_id: req.,
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

controller.deleteOne = (req, res, next) => {
    res.status(503);
    return;
};

controller.before([
    '*'
], (req, res, next) => {

    if (!req.isAuthenticated() || !req.user.isManager()) {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();

});


module.exports = controller;