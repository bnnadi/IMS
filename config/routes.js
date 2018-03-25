var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var path = require('path');
var passport = require('passport');

var public = require(BACKEND + '/controllers/public_controller');

var v0Customer = require(BACKEND + '/controllers/api/v0/customer_controller');
var v0Company = require(BACKEND + '/controllers/api/v0/company_controller');
var v0Employee = require(BACKEND + '/controllers/api/v0/employee_controller');
var v0Order = require(BACKEND + '/controllers/api/v0/order_controller');
var v0PasswordReset = require(BACKEND + '/controllers/api/v0/password_reset_controller');
var v0Product = require(BACKEND + '/controllers/api/v0/product_controller');
var v0Time = require(BACKEND + '/controllers/api/v0/timesheet_controller');
var v0User = require(BACKEND + '/controllers/api/v0/user_controller');

module.exports = function routes() {

    // access
    this.get('/api/v1/authenticate', public.authenticate);
    this.post('/api/v1/login.json', public.login);
    this.get('/api/v1/logout', passport.authenticate('jwt', { session: false }), public.logout);

    // reset
    this.post('/api/v1/passwordReset.json', v1PasswordReset.start);
    this.put('/api/v1/passwordVerify.json', v1PasswordReset.verify);

    //TODO: look into the api key authenticate
    // timesheet
    this.post('/api/v1/clockInOut', passport.authenticate('localapikey', { session: false }), v0Time.clockInOut);

    // company
    this.get('/api/v1/companies.json', passport.authenticate('jwt', { session: false }), v0Company.readMany);

    // customers
    this.post('/api/v1/customer.json', passport.authenticate('jwt', { session: false }), v0Customer.createOne);
    this.get('/api/v1/customer.json', passport.authenticate('jwt', { session: false }), v0Customer.readOne);
    this.get('/api/v1/customers.json', passport.authenticate('jwt', { session: false }), v0Customer.readMany);
    this.put('/api/v1/customer.json', passport.authenticate('jwt', { session: false }), v0Customer.updateOne);
    this.post('/api/v1/customer/addAddress.json', passport.authenticate('jwt', { session: false }), v0Customer.addAddress);
    this.post('/api/v1/customer/addPhoneNumber.json', passport.authenticate('jwt', { session: false }), v0Customer.addPhoneNumber);
    this.put('/api/v1/customer/updateAddress.json', passport.authenticate('jwt', { session: false }), v0Customer.updateAddress);
    this.put('/api/v1/customer/updatePhoneNumber.json', passport.authenticate('jwt', { session: false }), v0Customer.updatePhoneNumber);
    this.put('/api/v1/customer/removeAddress.json', passport.authenticate('jwt', { session: false }), v0Customer.removeAddress);
    this.put('/api/v1/customer/removePhoneNumber.json', passport.authenticate('jwt', { session: false }), v0Customer.removePhoneNumber);
    this.delete('/api/v1/customer/:id.json', passport.authenticate('jwt', { session: false }), v0Customer.deleteOne);

    // employee
    this.post('/api/v1/employee.json', passport.authenticate('jwt', { session: false }), v0Employee.createOne);
    this.get('/api/v1/employee.json', passport.authenticate('jwt', { session: false }), v0Employee.readOne);
    this.get('/api/v1/employees.json', passport.authenticate('jwt', { session: false }), v0Employee.readMany);
    this.put('/api/v1/employee.json', passport.authenticate('jwt', { session: false }), v0Employee.updateOne);
    this.delete('/api/v1/employee/:id.json', passport.authenticate('jwt', { session: false }), v0Employee.deleteOne);
    this.post('/api/v1/employee/addAddress.json', passport.authenticate('jwt', { session: false }), v0Employee.addAddress);
    this.post('/api/v1/employee/addPhoneNumber.json', passport.authenticate('jwt', { session: false }), v0Employee.addPhoneNumber);
    this.put('/api/v1/employee/updateAddress.json', passport.authenticate('jwt', { session: false }), v0Employee.updateAddress);
    this.put('/api/v1/employee/updatePhoneNumber.json', passport.authenticate('jwt', { session: false }), v0Employee.updatePhoneNumber);
    this.put('/api/v1/employee/removeAddress.json', passport.authenticate('jwt', { session: false }), v0Employee.removeAddress);
    this.put('/api/v1/employee/removePhoneNumber.json', passport.authenticate('jwt', { session: false }), v0Employee.removePhoneNumber);
    this.get('/api/v1/employee/generateQRCode', passport.authenticate('jwt', { session: false }), v0Employee.generateQRCode);


    // orders
    this.post('/api/v1/order.json', passport.authenticate('jwt', { session: false }), v0Order.createOne);
    this.get('/api/v1/order.json', passport.authenticate('jwt', { session: false }), v0Order.readOne);
    this.get('/api/v1/orders.json', passport.authenticate('jwt', { session: false }), v0Order.readMany);
    this.put('/api/v1/order.json', passport.authenticate('jwt', { session: false }), v0Order.updateOne);
    this.delete('/api/v1/order/:id.json', passport.authenticate('jwt', { session: false }), v0Order.deleteOne);

    // products
    this.post('/api/v1/product.json', passport.authenticate('jwt', { session: false }), v0Product.createOne);
    this.get('/api/v1/product.json', passport.authenticate('jwt', { session: false }), v0Product.readOne);
    this.get('/api/v1/products.json', passport.authenticate('jwt', { session: false }), v0Product.readMany);
    this.put('/api/v1/product.json', passport.authenticate('jwt', { session: false }), v0Product.updateOne);
    this.get('/api/v1/product/generateBarcode', passport.authenticate('jwt', { session: false }), v0Product.generateBarcode);
    this.delete('/api/v1/product/:id.json', passport.authenticate('jwt', { session: false }), v0Product.deleteOne);

    // timesheet
    this.get('/api/v1/timesheet', passport.authenticate('jwt', { session: false }), v0Time.read);
    this.get('/api/v1/timesheets', passport.authenticate('jwt', { session: false }), v0Time.readMany);

    // user
    this.get('/api/v1/user/authenticate', passport.authenticate('jwt', { session: false }), v0User.authenticate);
    this.get('/api/v1/user.json', passport.authenticate('jwt', { session: false }), v0User.readOne);
    this.put('/api/v1/user.json', passport.authenticate('jwt', { session: false }), v0User.updateOne);
    this.post('/api/v1/user/addAddress.json', passport.authenticate('jwt', { session: false }), v0User.addAddress);
    this.post('/api/v1/user/addPhoneNumber.json', passport.authenticate('jwt', { session: false }), v0User.addPhoneNumber);
    this.put('/api/v1/user/updateAddress.json', passport.authenticate('jwt', { session: false }), v0User.updateAddress);
    this.put('/api/v1/user/updatePhoneNumber.json', passport.authenticate('jwt', { session: false }), v0User.updatePhoneNumber);
    this.put('/api/v1/user/removeAddress.json', passport.authenticate('jwt', { session: false }), v0User.removeAddress);
    this.put('/api/v1/user/removePhoneNumber.json', passport.authenticate('jwt', { session: false }), v0User.removePhoneNumber);

    this.get('/values/strings.js', function(req, res) {

        var output = {};

        async.each([
            'ndeputa'
        ], function(item, next) {

            fs.readFile(ROOT + '/public/' + item + '/bower.json', 'utf8', function(err, data) {

                if (err) {
                    next(null);
                    return;
                }

                var parsedBower;

                try {
                    parsedBower = JSON.parse(data);
                } catch (e) {

                }

                output[item] = parsedBower.version;

                next();

            });

        }, function() {
            var values = _.extend(process.values.STRINGS, output);
            res.send('window.STRINGS=' + JSON.stringify(values));
        });
    });

    this.get('/values/errors.js', function(req, res) {
        var output = {};

        async.each([
            'ndeputa'
        ], function(item, next) {

            fs.readFile(FRONTEND + '/' + item + '/bower.json', 'utf8', function(err, data) {

                if (err) {
                    // log err
                    next(null);
                    return;
                }

                var parsedBower;

                try {
                    parsedBower = JSON.parse(data);
                } catch (e) {

                }

                output[item] = parsedBower.version;

                next();

            });

        }, function() {
            var values = _.extend(process.values.ERRORS, output);
            res.send('window.ERRORS=' + JSON.stringify(values));
        });
    });

    this.get('*', public.index);

};