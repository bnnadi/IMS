ROOT = __dirname + '/../../..';

var async = require('async');
var dotenv = require('dotenv').config();
var expect = require('expect.js');
var request = require('superagent');

var Sequelize = require("sequelize");

var DummyUser = require(path.join(ROOT + '/test/data/user'));
var DummyEmployee = require(path.join(ROOT + '/test/data/employee'));
var DummyEmployeeAssignment = require(path.join(ROOT + '/test/data/employee_assignment'));

var dummyUserAdmin = new DummyUser();

var config = {
    "database_name": process.env.DB_NAME,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "dialect": process.env.DB_DIALECT,
    "port": process.env.DB_PORT
};

var sequelize = new Sequelize(config.database_name, config.username, config.password, config);

var db = require(ROOT + '/app/models/index');

describe('Employee V1 API', function() {

    var adminToken;

    before(function(done) {

        var UserModel = db.employee;

        UserModel
            .create(dummyUserAdmin)
            .then(user => {
                dummyUserAdmin = result;
            })
            .catch();

    });

    before(function(done) {
        request
            .post(process.env.APP_URL + '/api/v1/login.json')
            .send({
                username: dummyUserAdmin.email,
                password: dummyUserAdmin.password
            })
            .end(function(err, res) {

                adminToken = res.body.result.token;

                done();
            });
    });

    it('Admin creates Sales Manager', (done) => {
        request
            .post(process.env.APP_URL +'/api/v1/clockInOut')
            .set('x-api-key', dummyApiKey.key)
            .set('Content-Type', 'application/json')
            .send({ email: 'admin@example.com' })
            .end((err, res) => {
                expect(res.status).to.be(200);
                var response = res.body,
                result = response.result;
                done();
            });
    });

});