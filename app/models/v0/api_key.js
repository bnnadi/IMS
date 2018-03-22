"use strict";

module.exports = function(sequelize, DataTypes) {
    var Company = sequelize.models.company;
    var User = sequelize.models.user;

    var ApiKey = sequelize.define("api_key", {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ttl: {
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'api_keys',
        timestamps: true,
        paranoid: true
    });

    ApiKey.prototype.isExpired = function() {
        var current = new Date();
        return current > this.ttl;
    };

    return ApiKey;
};