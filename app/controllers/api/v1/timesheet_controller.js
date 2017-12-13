// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var db = require(BACKEND + '/models');

var UserModel = db.user;
var TimesheetModel = db.timesheet;

controller.clockInOut = function(req, res, next) {

    var record = {};
    record.timeStamp = req.body.timeStamp;
    record.userId = req.body.userId;
    record.companyId = req.body.companyId;

    TimesheetModel
        .create(record)
        .spread(function(sheet, created) {
            res.json({
                success: true
            });
        });

};

controller.read = function(req, res, next) {
    var user = req.user;

    var id = req.query.id;
    var userId = req.query.userId || user.id;

    TimesheetModel
        .findById(id)
        .then(function(sheet) {
            res.json({
                result: user.toJSON()
            });
            return;
        })
        .catch(function(err) {
            console.log(nnLine, new Date());
            res.status(404);
            res.json({
                errors: err,
            });
            return;
        });

};

controller.readMany = function(req, res, next) {

    var user = req.user;

    async.series({
        security: function(cb) {
            if ('admin' === user.accountType) {
                return cb(null);
            }
        }
    });
};

controller.before([
    'read',
    'readMany'
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

module.exports = controller;