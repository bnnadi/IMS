// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');
var jwt = require('jsonwebtoken');
var passport = require('passport');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();

var db = require(BACKEND + '/models');

var ApiKeyModel = db.api_key;

controller.index = (req, res) => {
    res.sendFile('index.html', {
        root: ROOT + '/public/dist/'
    });
};

controller.authenticate = (req, res, next) => {

    var api_key = req.query.key;

    ApiKeyModel
        .find({ where: { key: api_key } })
        .then((key) => {
            if (!key) {
                console.log(nnLine, new Date());
                res.status(400);
                res.json({
                    errors: 'Unauthorized',
                });
                return;
            }

            if (key.isExpired()) {
                console.log(nnLine, new Date());
                res.status(400);
                res.json({
                    errors: 'Unauthorized',
                });
                return;
            }

            res.json({
                success: true
            });
            return;
        })
        .catch((err) => {
            console.log(nnLine, new Date());
            res.status(400);
            res.json({
                errors: invalid,
            });
            return;
        });

};

controller.login = (req, res, next) => {

    var username = req.body.username;
    var password = req.body.password;

    // validate the parameters
    var schema = jsSchema({
        username: String,
        password: String.of(8, null, null),
    });

    var invalid = schema.errors({
        username: username,
        password: password
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

    passport.authenticate('v1-local-user', (err, result, info) => {

        if (err) {
            errors = ['NNC-01001'];
            console.log(err);
            console.log(nnLine, new Date());
            res.status(500);
            res.json({
                errors: err,
            });
            return;

        }

        if (!result) {
            errors = ['NNC-01002'];
            console.log(nnLine, new Date());
            res.status(404);
            res.json({
                errors: errors,
            });
            return;

        }
        // req.logout();

        req.logIn(result, (err) => {

            if (err) {
                var errors = ['NNC-00002'];
                console.log(err);
                console.log(nnLine, new Date());
                res.status(500);
                res.json({
                    errors: errors,
                });
                return;
            }

            var user = {
                id: result.id,
                permission_level_code: result.permission_level_code,
                email: result.email,
                name: result.getFullName(),
                first_name: result.first_name,
                last_name: result.last_name,
                profile_img: '' // figure this nonesense out
            };

            res.json({
                result: user
            });
            return;

        });

    })(req, res, next);

};

controller.logout = (req, res, next) => {

    req.logout();

    req
        .session
        .destroy(function(err) {
            res.redirect('/login');
        });

};

controller.before([
    'login',
], (req, res, next) => {

    if (req.isAuthenticated()) {
        res.status(200);
        res.json({
            result: req.user
        });
        return;
    }

    next();

});

controller.before([
    'index',
], (req, res, next) => {

    if (req.isAuthenticated()) {

        res.redirect('/');
        return;
    }

    next();

});



module.exports = controller;