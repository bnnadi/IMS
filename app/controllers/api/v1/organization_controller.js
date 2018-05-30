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
const uuidV4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

var OrganizationModel = db.organization;
var OrganizationUnitModel = db.organization_unit;

controller.createOne = (req, res, next) => {

    var user = req.user || {};
    var record = {};

    OrganizationModel
        .create(record)
        .spread((org, created) => {
            res.json({
                result: org.get({plain: true})
            });
            return;
        })

};

controller.readOne = (req, res, next) => {

    var user = req.user || {};
    var id, query = {};

    id = req.query.id;


    var schema = jsSchema({
        '?id': uuidV4,
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

    query.where = {
        organization_id: id
    };

    OrganizationModel
        .findOne(query)
        .then(org => {
            res.json({
                result: org.toJSON(),
            });
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

controller.readMany = (req, res, next) => {

    var user = req.user || {};

    var populate = req.body.populate || [];

    OrganizationModel
        .findAndCountAll()
        .then((organizations) => {
            res.json({
                result: organizations
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
    var id, query = {};

    id = req.query.id;


    var schema = jsSchema({
        '?id': uuidV4,
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

    if (req.query.organization_name)
        query.organization_name = req.query.organization_name;

    if (req.query.address)
        query.address = req.query.address
    
    if (req.query.other_details)
        query.other_details = req.query.other_details;

    OrganizationModel
        .update(query, {
            where: {
                organization_id: id
            },
            returning: true,
            paranoid: true,
            plain: true
        })
        .then(organization => {
            res.json({
                result: organization
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

controller.deleteOne = (req, res, next) => {

    var user = req.user || {};

    var id = req.params.id;

    var schema = jsSchema({
        '?id': uuidV4,
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
        })

};

controller.readManyOragnizationUnit = (req, res, next) => {

    var user = req.user || {};
    var id, query = {};

    id = req.params.id;

    var schema = jsSchema({
        '?id': uuidV4
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

    query.where = {
        organization_id: id
    };

    OrganizationUnitModel
        .findAndCountAll(query)
        .then((units) => {
            res.json({
                result: units
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

controller.readOragnizationUnit = (req, res, next) => {

    var user = req.user || {};
    var id, unitId, query = {};

    id = req.params.id;
    unitId = req.query.unit_id;

    var schema = jsSchema({
        '?id': uuidV4,
        '?unitId': uuidV4
    });

    var invalid = schema.errors({
        id: id,
        unitId: unitId
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

    query.where = {
        organization_id: id,
        organization_unit_id: unitId
    };

    OrganizationUnitModel
        .findOne(query)
        .then((unit) => {
            res.json({
                result: unit
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

controller.addOragnizationUnit = (req, res, next) => {

    var user = req.user || {};
    var id = req.params.id;
    var schema = jsSchema({
        '?id': uuidV4
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
            res.status(201);
            res.json({
                result: unit,
            });
            return;
        })
        .catch(err => {
            console.log(nnLine, err)
            res.status(500);
            res.json({
                errors: err,
            });
            return;
        })


};

controller.updateOragnizationUnit = (req, res, next) => {

    var user = req.user || {};
    var id = req.params.id,
    unitId = req.query.unit_id;

    var schema = jsSchema({
        '?id': uuidV4,
        '?unitId': uuidV4
    });

    var invalid = schema.errors({
        id: id,
        unitId: unitId
    });
        
    if (invalid) {
        console.log(invalid)
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

    if(req.query.organization_unit_name) {
        record.organization_unit_name = req.query.organization_unit_name
    }
    

    if(req.query.parent_organization_unit_id) {
        record.parent_organization_unit_id = req.query.parent_organization_unit_id
    }

    if(req.query.other_details) {
        record.other_details = req.query.other_details;
    }


    OrganizationUnitModel
        .update(record, {
            where: {
                organization_unit_id: unitId
            },
            returning: true,
            paranoid: true,
            plain: true
        })
        .then(unit => {
            res.json({
                result: unit,
            });
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

controller.removeOragnizationUnit = (req, res, next) => {

    var user = req.user || {};
    var id = req.params.id,
    unitId = req.query.unit_id;
    console.log(req.query)

    var schema = jsSchema({
        '?id': uuidV4,
        '?unitId': uuidV4
    });

    var invalid = schema.errors({
        id: id,
        unitId: unitId
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

    var query = {};
    query.where = {
        organization_id: id,
        organization_unit_id: unitId
    }

    OrganizationUnitModel
        .destroy(query)
        .then((unit, err) => {
            if(err) {
                res.status(500);
                res.json({
                    errors: err,
                });
                return;
            }
            res.status(204);
            return;
        })

};

// controller.before([
//     '*'
// ], (req, res, next) => {

//     if (!req.user) {
//         res.status(401);
//         res.json({
//             errors: 'UNAUTHORIZED'
//         });
//         return;
//     }

//     next();

// });

// controller.before([
//     'deleteOne'
// ], (req, res, next) => {

//     if (req.user && req.user.permission_level_code < 3) {
//         res.status(401);
//         res.json({
//             errors: 'UNAUTHORIZED'
//         });
//         return;
//     }

//     next();
// });

module.exports = controller;