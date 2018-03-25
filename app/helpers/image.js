// libraries
var async = require('async');
var AWS = require('aws-sdk');

var s3 = new AWS.S3();

var Image = {};

Image.saveImage = (file) => {
    var fileName = file['file-name'];
    var fileType = file['file-type'];
    var s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, function(err, data) {
        if (err) {
            console.log(err);
            return res.end();
        }
        var returnData = {
            signedRequest: data,
            url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
};

module.exports = Image;