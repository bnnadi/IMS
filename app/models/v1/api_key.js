"use strict";
const rand = require("keygenerator");

module.exports = function(sequelize, DataTypes) {
    var ApiKey = sequelize.define("api_key", {
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ttl: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                isBefore: DataTypes.NOW
            }
        },
    }, {
        tableName: 'api_keys',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    ApiKey.associate = (models) => {};

    ApiKey.beforeValidate((apiKey, options) => {
        apiKey.key = rand._({length: 50});
    });

    ApiKey.prototype.isExpired = function() {
        var current = new Date();
        return current > this.ttl;
    };

    return ApiKey;
};