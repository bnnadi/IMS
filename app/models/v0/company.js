"use strict";

module.exports = function(sequelize, DataTypes) {
    var Company = sequelize.define("company", {
        companyName: {
            type: DataTypes.TEXT,
            field: 'customer_name'
        }
    }, {
        tableName: 'companies',
        timestamps: true,
        paranoid: true
    });

    Company.associate = function(models) {};

    return Company;
};