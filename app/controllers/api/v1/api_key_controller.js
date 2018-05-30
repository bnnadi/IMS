// libraries
var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

const db = require(BACKEND + '/models');

var ApiKeyModel = db.api_key;
var EmployeeModel = db.employee;

controller.createOne = (req, res, next) => {

    var ttl = req.body.ttl;

    var record = {
        ttl: ttl
    }

    ApiKeyModel
        .create(record)
        .then(key => {
            res.status(201);
            res.json({
                result: key
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

controller.readOne = (req, res, next) => {
    var user = req.user || {};

    var id = req.query.key_id;

    // validate the parameters
    var schema = jsSchema({
        '?id': /\+?\d+$/i,
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

    ApiKeyModel
        .findById(id)
        .then(key => {
            res.json({
                result: key
            });
            return;
        })
        .catch(err => {
            res.status(500);
            res.json({
                errors: err.errors
            });
            return;
        })
};

controller.readMany = (req, res, next) => {
    var user = req.user || {};
    var populate = req.body.populate || [];
    var orderBy = req.query.orderBy;
    var limit = req.query.limit || 10;
    var offset = req.query.offset || 0;

    ApiKeyModel
        .findAndCountAll({
            subQuery: false,
            include: populate,
            order: orderBy,
            limit: limit,
            offset: offset,
        })
        .then(keys => {
            res.json({
                result: keys
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

// controller.before([
//     'createOne',
//     'readOne',
//     'readMany'
// ], function(req, res, next) {

//     if (!req.user) {
//         res.status(401);
//         res.json({
//             errors: 'UNAUTHORIZED'
//         });
//         return;
//     } else if(req.isAuthenticated() && !req.user.permission_levek_code < 3) {
//         res.status(403);
//         res.json({
//             errors: 'FORBIDDEN'
//         });
//         return;
//     }


//     next();

// });

module.exports = controller;