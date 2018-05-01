var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var path = require('path');
var passport = require('passport');

// const expressJwt = require('express-jwt');  
// const authenticate_user = expressJwt({secret : process.env.JWT_KEY});

var public = require(BACKEND + '/controllers/public_controller');
var verify = require(CONFIG + '/middleware/verify');

var v1ApiKey = require(BACKEND + '/controllers/api/v1/api_key_controller');
var v1Customer = require(BACKEND + '/controllers/api/v1/customer_controller');
var v1Employee = require(BACKEND + '/controllers/api/v1/employee_controller');
// var v1PasswordReset = require(BACKEND + '/controllers/api/v1/password_reset_controller');
var v1Product = require(BACKEND + '/controllers/api/v1/product_controller');
var v1Time = require(BACKEND + '/controllers/api/v1/timesheet_controller');
var v1Order = require(BACKEND + '/controllers/api/v1/order_controller');
var v1Organization = require(BACKEND + '/controllers/api/v1/organization_controller');
var v1User = require(BACKEND + '/controllers/api/v1/user_controller');

module.exports = function routes() {
    // api check
    this.get('api/v1/ping.json', public.pong);
    // access
    this.post('/api/v1/login.json', public.login);
    this.get('/api/v1/logout', public.logout);

    // reset
    // this.post('/api/v1/passwordReset.json', v1PasswordReset.start);
    // this.put('/api/v1/passwordVerify.json', v1PasswordReset.verify);

    // authenticate
    this.get('/api/v1/authenticate', verify.apiKey, public.authenticate);
    // timesheet
    this.post('/api/v1/clockInOut', verify.apiKey, v1Time.clockInOut);

    // api_key
    this.post('/api/v1/generateApiKey.json', verify.access , v1ApiKey.createOne);
    this.get('/api/v1/apiKey.json', verify.access , v1ApiKey.readOne);
    this.get('/api/v1/apiKeys.json', verify.access , v1ApiKey.readMany);

    // customers
    this.post('/api/v1/customer.json', verify.access , v1Customer.createOne);
    this.get('/api/v1/customer.json', verify.access , v1Customer.readOne);
    this.get('/api/v1/customers.json', verify.access , v1Customer.readMany);
    this.put('/api/v1/customer.json', verify.access , v1Customer.updateOne);
    this.post('/api/v1/customer/:id/addAddress.json', verify.access , v1Customer.addAddress);
    this.post('/api/v1/customer/:id/addPhoneNumber.json', verify.access , v1Customer.addPhoneNumber);
    this.put('/api/v1/customer/updateAddress.json', verify.access , v1Customer.updateAddress);
    this.put('/api/v1/customer/updatePhoneNumber.json', verify.access , v1Customer.updatePhoneNumber);
    this.put('/api/v1/customer/removeAddress.json', verify.access , v1Customer.removeAddress);
    this.put('/api/v1/customer/removePhoneNumber.json', verify.access , v1Customer.removePhoneNumber);
    this.delete('/api/v1/customer/:id.json', verify.access , v1Customer.deleteOne);

    // employee
    this.post('/api/v1/employee.json', verify.access , v1Employee.createOne);
    this.get('/api/v1/employee.json', verify.access , v1Employee.readOne);
    this.get('/api/v1/employees.json', verify.access , v1Employee.readMany);
    this.put('/api/v1/employee.json', verify.access , v1Employee.updateOne);
    this.delete('/api/v1/employee/:id.json', verify.access , v1Employee.deleteOne);
    this.post('/api/v1/employee/:id/addAddress.json', verify.access , v1Employee.addAddress);
    this.post('/api/v1/employee/:id/addPhoneNumber.json', verify.access , v1Employee.addPhoneNumber);
    this.put('/api/v1/employee/:id/updateAddress.json', verify.access , v1Employee.updateAddress);
    this.put('/api/v1/employee/:id/updatePhoneNumber.json', verify.access , v1Employee.updatePhoneNumber);
    this.put('/api/v1/employee/:id/removeAddress.json', verify.access , v1Employee.removeAddress);
    this.put('/api/v1/employee/:id/removePhoneNumber.json', verify.access , v1Employee.removePhoneNumber);
    this.get('/api/v1/employee/:id/generateQRCode', verify.access , v1Employee.generateQRCode);


    // orders
    this.post('/api/v1/order.json', verify.access , v1Order.createOne);
    this.get('/api/v1/order.json', verify.access , v1Order.readOne);
    this.get('/api/v1/orders.json', verify.access , v1Order.readMany);
    this.put('/api/v1/order.json', verify.access , v1Order.updateOne);
    this.delete('/api/v1/order/:id.json', verify.access , v1Order.deleteOne);

    // organization
    this.post('/api/v1/organization.json', verify.access , v1Organization.createOne);
    this.get('/api/v1/organization.json', verify.access , v1Organization.readOne);
    this.get('/api/v1/organizations.json', verify.access , v1Organization.readMany);
    this.put('/api/v1/organization.json', verify.access , v1Organization.updateOne);
    this.get('/api/v1/organization/:id/units.json', verify.access , v1Organization.readManyOragnizationUnit);
    this.post('/api/v1/organization/:id/addUnit.json', verify.access , v1Organization.addOragnizationUnit);
    this.get('/api/v1/organization/:id/unit.json', verify.access , v1Organization.readOragnizationUnit);
    this.put('/api/v1/organization/:id/updateUnit.json', verify.access , v1Organization.updateOragnizationUnit);
    this.put('/api/v1/organization/:id/removeUnit.json', verify.access , v1Organization.removeOragnizationUnit);

    // products
    this.post('/api/v1/product.json', verify.access , v1Product.createOne);
    this.get('/api/v1/product.json', verify.access , v1Product.readOne);
    this.get('/api/v1/products.json', verify.access , v1Product.readMany);
    this.put('/api/v1/product.json', verify.access , v1Product.updateOne);
    this.get('/api/v1/product/:id/generateBarcode', verify.access , v1Product.generateBarcode);
    this.delete('/api/v1/product/:id.json', verify.access , v1Product.deleteOne);

    // timesheet
    this.get('/api/v1/timesheet.json', verify.access , v1Time.readOne);
    this.get('/api/v1/timesheets.json', verify.access , v1Time.readMany);
    this.put('/api/v1/timesheet.json', verify.access , v1Time.updateOne);
    this.delete('/api/v1/timesheets/:id.json', verify.access , v1Time.deleteOne);

    // user
    this.get('/api/v1/user/authenticate', verify.access , v1User.authenticate);
    this.get('/api/v1/user.json', verify.access , v1User.readOne);
    this.put('/api/v1/user.json', verify.access , v1User.updateOne);
    this.post('/api/v1/user/addAddress.json', verify.access , v1User.addAddress);
    this.post('/api/v1/user/addPhoneNumber.json', verify.access , v1User.addPhoneNumber);
    this.put('/api/v1/user/updateAddress.json', verify.access , v1User.updateAddress);
    this.put('/api/v1/user/updatePhoneNumber.json', verify.access , v1User.updatePhoneNumber);
    this.put('/api/v1/user/removeAddress.json', verify.access , v1User.removeAddress);
    this.put('/api/v1/user/removePhoneNumber.json', verify.access , v1User.removePhoneNumber);

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