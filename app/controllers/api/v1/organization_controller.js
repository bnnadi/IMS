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

var OrganizationModel = db.organization;
var OrganizationUnitModel = db.organization_units;

controller.createOne = (req, res, next) => {

    var user = req.user || {};
    var record = {};

    OrganizationModel
        .create(record)
        .spread((org, created) => {
            console.log(org.get({plain: true}))
            console.log(created)
            res.json({
                result: org.get({plain: true})
            });
            return;
        })

};

controller.readOne = (req, res, next) => {

    var user = req.user || {};
    var query = {};

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

    OrganizationModel
        .findOne(query)
        .then(org => {})
        .catch(err => {})

};

controller.readMany = (req, res, next) => {

    var user = req.user || {};

    var populate = req.body.populate || '';

    OrganizationModel
        .findAndCountAll()
        .then((companies) => {
            res.json({
                result: companies
            });
            return;
        }).catch((err) => {
            res.status(404);
            res.json({
                errors: errors,
            });
            return;
        });
};

controller.updateOne = (req, res, next) => {

    var user = req.user || {};

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

    var query = {};
    query.where = {
        organization_id: id
    }

    OrganizationModel
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
        }

};

controller.addOragnizationUnit = (req, res, next) => {

    var user = req.user || {};
    var id = req.params.id;

    async.series([
        (cb) => {

            OrganizationModel
                .findOne({organization_id: id})
                .then(org => {
                    if(!org) {
                        cb(null, false)
                        return;
                    }
                    cb(org)
                })
                .catch(cb)

        },
    ],(result, err) => {

        if (err) {
            res.status(500);
            res.json({
                errors: errors,
            });
            return;
        }

        var record = {
            organization_id: id,
            organization_unit_name: req.body.organization_unit_name
        };

        if(req.body.parent_organization_unit_id) {
            record.parent_organization_unit_id = req.body.parent_organization_unit_id
        }

        if(req.body.other_details) {
            record.other_details = req.body.other_details;
        }

        OrganizationUnitModel
            .create(record)
            .then(unit => {
                res.json({
                    result: unit,
                });
                return;
            })
            .catch(err => {
                res.status(400);
                res.json({
                    errors: errors,
                });
                return;
            })



    })

};

controller.updateOragnizationUnit = (req, res, next) => {

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


    OrganizationUnitModel
        .update(record)
        .then(unit => {
            res.json({
                result: unit,
            });
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

controller.removeOragnizationUnit = (req, res, next) => {

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
        organization_unit_id: id
    }

    OrganizationUnitModel
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
        }

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

controller.before([
    'deleteOne'
], (req, res, next) => {

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