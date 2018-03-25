// libraries
var async = require('async');
var fs = require('fs');
var nodemailer = require('nodemailer');

var Mailer = {};

Mailer.send = (mailOptions) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: process.env.GMAIL_EMAIL,
               pass: process.env.GMAIL_PASS
           }
        });

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    });
};

module.exports = Mailer;