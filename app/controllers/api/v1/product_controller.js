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

var ProductModel = db.product;

controller.createOne = (req, res, next) => {
    var user = req.user || {};

    var record = options = {};

    record.product_name = req.body.product_name;
    record.qty = req.body.qty;
    record.description = req.body.description;
    if (req.body.parent_product_id)
        record.parent_product_id = req.body.parent_product_id;


    ProductModel
        .findOrCreate({
            where: { email: record.email },
            defaults: record,
            attributes: ['employee_id', 'email', 'last_name', 'first_name', 'createdAt'],
            include: [Employee.Address, Employee.Phone]
        })
        .spread((product, created) => {
            res.status(201)
            res.json({
                result: product.get({plain: true})
            })
        });
};

controller.readOne = (req, res, next) => {

    var user = req.user || {};
    var id = req.query.id;

    var schema = jsSchema({
        '?id': /^[a-f\d]{24}$/i,
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
            errors: errors,
        });
        return;
        
    }

    ProductModel
        .findById()
        .then(product => {})
        .catch(err => {})
};

controller.readMany = (req, res, next) => {
    var user = req.user || {};

    var id = req.query.id || user._id;
    var populate = req.body.populate || [];
    var orderBy = req.query.orderBy;
    var limit = req.query.limit || 10;
    var offset = req.query.offset || 0;

    ProductModel
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
    var id = req.params.id;

    var schema = jsSchema({
        '?id': /^[a-f\d]{24}$/i,
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
            errors: errors,
        });
        return;
        
    }
    var query = {};
    query.where = {
        product_id: id
    }

    ProductModel
        .update(query)
        .then(product => {})
        .catch(err => {})
};

controller.deleteOne = (req, res, next) => {
    var user = req.user || {};
    var id = req.params.id;

    var schema = jsSchema({
        '?id': /^[a-f\d]{24}$/i,
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
            errors: errors,
        });
        return;
        
    }

    var query = {};
    query.where = {
        product_id: id
    }

    ProductModel
        .destory(query)
        .then(product => {
            res.status(204);
            return;
        })
        .catch(err => {})
};

controller.generateBarcode = (req, res, next) => {};

// controller.before([
//     '*'
// ], (req, res, next) => {

//     if (!req.isAuthenticated() || !req.user.isManager()) {
//         res.status(401);
//         res.json({
//             errors: 'UNAUTHORIZED'
//         });
//         return;
//     }

//     next();

// });

module.exports = controller;