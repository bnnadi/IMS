var express = require('express');
var fs = require('fs');
var https = require('https');

module.exports = function() {

    var app = this;

    app.use(express.static(FRONTEND + '/dashboard', {
        maxAge: 860000
    }));

};