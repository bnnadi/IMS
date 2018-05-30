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
var OrderModel = db.order;

controller.createOne = (req, res, next) => {};

controller.readOne = (req, res, next) => {
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

    OrderModel
        .findOne()
        .then(order => {})
        .catch(err => {})
};

controller.readMany = (req, res, next) => {
    var user = req.user || {};
    var populate = req.body.populate || [];
    var orderBy = req.query.orderBy;
    var limit = req.query.limit || 10;
    var offset = req.query.offset || 0;

    OrderModel
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

    var id= req.params.id;

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
        order_id: id
    }

    OrderModel
        .destroy(query)
        .then(unit => {
            res.status(204);
            return;
        })
        .catch(err => {
            res.status(400);
            res.json({
                errors: errors,
            });
            return;
        })
};

controller.before([
    '*'
], (req, res, next) => {

    if (!req.user) {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();

});

module.exports = controller;