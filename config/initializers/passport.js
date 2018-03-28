// libraries
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var passportAPIKEY = require('passport-localapikey');

// strategies
var LocalStrategy = require('passport-local').Strategy;
var LocalAPIKeyStrategy = passportAPIKEY.Strategy;

module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};

    passport.use('v1-local-user', new LocalStrategy(function(username, password, done) {

        username.toLowerCase().replace(/^[ \t]+|[ \t]+$/ig, '');

        var UserModel = require(BACKEND + '/models').employee;

        UserModel
            .findOne({
                where: { email: username }
            })
            .then(function(user) {

                if (!user) { return done(null, false); }
                if (!user.isValidPassword(password)) { return done(null, false); }


                user.last_login_at = new Date();

                return done(null, user);
            })
            .catch(function(reason) {
                return done(reason);
            });

    }));

    passport.use(new LocalAPIKeyStrategy(function(apikey, done) {
        var ApiKeyModel = require(BACKEND + '/models').api_key;
        ApiKeyModel
            .find({ where: { key: apikey } }, function(err, key) {
                if (err) { return done(err); }
                if (!key) { return done(null, false); }
                if (key.isExpired()) { return done(null, false); }
                return done(null, key);
            });
    }));


    passport.serializeUser(function(user, done) {

        done(null, {
            '_id': user.employee_id,
            'permission_level_code': user.permission_level_code,
            'canDelete': user.canDelete(),
            'isManager': user.isManager() 
        });
    });

    passport.deserializeUser(function(user, done) {

        // done(null, false);

        var id = user._id;
        var UserModel = require(BACKEND + '/models').employee;

        UserModel
            .findById(id)
            .then(function(err) {
                if (user) {
                    done(null, user);
                } else {
                    done(user.errors, null);
                }
            });
    });

    done();
};