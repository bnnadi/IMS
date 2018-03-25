var express = require('express');
var fs = require('fs');
var https = require('https');

module.exports = function() {

    var app = this;

    app.use(express.static(FRONTEND + '/dist', {
        maxAge: 860000
    }));

};