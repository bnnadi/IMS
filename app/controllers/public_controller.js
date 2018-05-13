// libraries
const async = require('async');
const fs = require('fs');
const jsSchema = require('js-schema');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();

var db = require(BACKEND + '/models');

var ApiKeyModel = db.api_key;

controller.index = (req, res) => {
    res.sendFile('index.html', {
        root: ROOT + '/public/dashboard/'
    });
};

controller.authenticate = (req, res, next) => {

    var api_key = req.query.key;
    console.log(req.query)

    ApiKeyModel
        .findOne({ where: { key: api_key } })
        .then((key) => {
            console.log(key)
            if (!key) {
                console.log(nnLine, new Date());
                res.status(401);
                res.json({
                    errors: 'Unauthorized',
                });
                return;
            }

            if (key.isExpired()) {
                console.log(nnLine, new Date());
                res.status(401);
                res.json({
                    errors: 'Unauthorized. Your key has expired please get a new key.',
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
                errors: err.errors,
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

    passport.authenticate('v1-local-user', { session: false }, (err, result, info) => {

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

            const user = {
                id: result.employee_id,
                permission_level_code: result.permission_level_code,
                email: result.email,
                first_name: result.first_name,
                last_name: result.last_name,
                profile_img: '' // figure this nonesense out
            };

            const token = jwt.sign({ _id: user.id }, process.env.JWT_KEY, { expiresIn: Math.floor(Date.now() / 1000) + (360 * 60)}); // expires in 6 hours
            jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
                console.log(decoded);
            })
            res.json({
                user: user,
                token: token
            });
            return;

        });

    })(req, res, next);

};

controller.logout = (req, res, next) => {
    console.log("Logging out ....");
    res.status(200)

};

controller.pong = (req, res, next) => {
    res.json({
        result: 'PONG'
    });
    return;

};

// controller.before([
//     'login',
// ], (req, res, next) => {

//     if (req.isAuthenticated()) {
//         res.status(200);
//         res.json({
//             result: req.user
//         });
//         return;
//     }

//     next();

// });

// controller.before([
//     'index',
// ], (req, res, next) => {

//     if (req.isAuthenticated()) {

//         res.redirect('/');
//         return;
//     }

//     next();

// });



module.exports = controller;