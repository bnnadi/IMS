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
var InvoiceModel = db.invoice;

controller.createOne = (req, res, next) => {};

controller.readOne = (req, res, next) => {
    var user = req.user || {};

    var id = req.query.id || user._id;

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

    InvoiceModel
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
    var populate = req.body.populate || [];
    var orderBy = req.query.orderBy;
    var limit = req.query.limit || 10;
    var offset = req.query.offset || 0;

    InvoiceModel
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
        // validate the parameters
        var schema = jsSchema({
            id: Number,
        });
    
        var invalid = schema.errors({
            id: user._id
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
};

controller.deleteOne = (req, res, next) => {
    res.status(503);
    return;
};

controller.download = (req, res, next) => {
    var user = req.user || {};
    var id = req.params.id;
    
    // validate the parameters
    var schema = jsSchema({
        id: Number,
    });
    
    var invalid = schema.errors({
        id: user._id
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

    InvoiceModel
        .findById(id)
        .then(invoice => {
            console.log(invoice)
            return;
        })
        .catch(err => {
            res.status(400);
            res.json({
                errors: err,
            });
            return;
        })
};

controller.before([
    '*'
], (req, res, next) => {

    if (!req.user {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();

});

module.exports = controller;