// libraries
var _ = require('lodash');
var async = require('async');
var bwipjs = require('bwip-js');
var fs = require('fs');
var image = require(BACKEND + '/helpers/image');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var ProductModel = require(BACKEND + '/models').product;

controller.createOne = function(req, res, next) {
    var user = req.user || {};

    var record = {};
    record.createdById = user.user_id || user._id;
    record.companyId = req.body.company_id;
    record.description = req.body.description;
    record.qty = req.body.qty;

    if (req.file) {
        console.log(req.file);
        // image.saveImage();
    }

    ProductModel
        .create(record)
        .then(function(product) {
            res.json({
                result: product
            });
            return;
        })
        .catch(function(err) {
            res.status(404);
            res.json({
                error: err
            });
            return;
        });
};

controller.readOne = function(req, res, next) {
    var user = req.user || {};

    var populate = req.body.populate || '';

    var id = req.query.id;

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
            errors: errors,
        });
        return;

    }

    ProductModel
        .findById(id)
        .then(function(product) {
            res.json({
                result: product
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

controller.readMany = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var limit, orderBy;

    ProductModel
        .findAndCountAll()
        .then(function(products) {
            res.json({
                result: products
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

    var populate = req.body.populate || '';

    var id = req.body.id;

    ProductModel
        .findById(id)
        .then()
        .catch();

};

controller.deleteOne = function(req, res, next) {

    var user = req.user || {};

    var id = req.params.id;

};

controller.generateBarcode = function(req, res, next) {
    var user = req.user || {};

    var populate = req.body.populate || '';

    var id = req.body.id;

    ProductModel
        .findById(id)
        .then(function(product) {

            if (!product) {
                res.status(404);
                res.json({
                    errors: 'Record not Found',
                });
                return;
            }

            bwipjs.toBuffer({
                bcid: 'code128',
                text: product.barcode,
                height: 10,
                includetext: false,
            }, function(err, png) {
                if (err) {
                    res.status(404);
                    res.json({
                        errors: err,
                    });
                    return;
                } else {
                    res.send(png);
                    return;
                }
            });
        })
        .catch(function(err) {
            res.status(404);
            res.json({
                errors: err,
            });
            return;
        });
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

    if (!req.isAuthenticated() || req.user.canDelete()) {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();
});



module.exports = controller;