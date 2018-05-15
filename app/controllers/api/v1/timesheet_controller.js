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

var TimesheetModel = db.timesheet;
var Employee = db.employee;
var EmployeeAssignment = db.employee_assignment;

controller.clockInOut = (req, res, next) => {

    var email = req.body.email;
    var record = {};
    
    // validate the parameters
    var schema = jsSchema({
        '?email': /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    });
    
    var invalid = schema.errors({
        email: email
    });
    
    if (invalid) {
    
        var errors = ['NNC-01001'];
        // res.nnBunyan(errors);
        console.log(nnLine, new Date());
        res.status(400);
        res.json({
            errors: 'Invalid email',
        });
        return;
    
    }

    async.series([
        (cb) => {
            Employee
                .findOne({
                    where: {email: email},  
                    attributes: ['employee_id']
                })
                .then((employee, err) => {
                    if(err) {
                        res.status(500);
                        res.json({
                            errors: err.errors
                        });
                        return;
                    }

                    if(!employee) {
                        res.status(404);
                        res.json({
                            errors: 'Employee not found'
                        });
                        return;
                    }
                    record.timesheetForEmployee_id = employee.employee_id;
                    cb({id: employee.employee_id})
                })

        }
    ], (result) => {
        console.log(result);
        TimesheetModel
            .findOne({
                where: {timesheetForEmployee_id: result.id}, 
                order: [ [ 'created_at', 'DESC' ]],
                include: [{
                    model: EmployeeAssignment,
                    where: { employee_id: result.id }
                }]
            })
            .then(time => {
                console.log(time)
                const date = new Date();
                if(time) {
                    record.end_date = date;
                    return time.update(record)
                } else {
                    record.start_date = date;
                    return TimesheetModel.create(record)
                }
            })
            .then(time => {
                console.log(time)
                res.json({
                    result: 'success'
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
    })

};

controller.readOne = (req, res, next) => {
    var user = req.user || {};

    var id = req.query.id || user._id;

    // validate the parameters
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

    TimesheetModel
        .findById(id)
        .then(time => {
            res.json({
                result: time
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

controller.readMany = (req, res, next) => {
    var user = req.user || {};

    var populate = req.body.populate || [];
    var orderBy = req.query.orderBy;
    var limit = req.query.limit || 10;
    var offset = req.query.offset || 0;
    var record = {};

    // search for organization unit
    if(req.query.u_id) {}

    // search for employee
    if(req.query.e_id) {}

    record.timesheetForEmployee_id = user._id

    TimesheetModel
        .findAndCountAll({where: record}, {
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
};

controller.deleteOne = (req, res, next) => {
    var user = req.user || {};
};

controller.before([
    'readOne',
    'readMany'
], function(req, res, next) {

    if (!req.user) {
        res.status(401);
        res.json({
            errors: 'UNAUTHORIZED'
        });
        return;
    }

    next();

});

controller.before([
    'updateOne',
    'deleteOne'
], function(req, res, next) {

    if (req.user && req.user.permission_level_code < 3) {
        res.status(403);
        res.json({
            errors: 'FORBIDDEN'
        });
        return;
    }

    next();

});

module.exports = controller;