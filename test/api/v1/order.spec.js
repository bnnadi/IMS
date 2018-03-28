/*jslint node: true */
ROOT = __dirname + '/../../..';

var assert = require('assert');
var async = require('async');
var dotenv = require('dotenv').config();
var expect = require('expect.js');
var path = require('path');
var request = require('superagent');

var Sequelize = require('sequelize');

var DummyOrder = require(path.join(ROOT + '/test/data/order'));
var DummyUser = require(path.join(ROOT + '/test/data/user'));

var dummyOrder = new DummyOrder();
var dummyOrganizationUnit = new DummyOrganizationUnit();
var dummyUserAdmin = new DummyUser();
var dummyOrders = [];
var dummyOrganizationUnits = [];

var config = require(path.join(ROOT + '/test/config'));

var sequelize = new Sequelize(config.database_name, config.username, config.password, config);

var db = require(path.join(ROOT + '/app/models/index'));

describe('Order V1 API',() => {

    var adminToken;

    before(function(done) {

        var UserModel = db.user;

        UserModel
            .create(dummyUserAdmin)
            .then()
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
});