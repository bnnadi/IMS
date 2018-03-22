"use strict";

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("product", {
        product_name: DataTypes.STRING,
        description: DataTypes.TEXT,
        barcode: DataTypes.STRING,
        companyId: {
            type: DataTypes.INTEGER,
            field: 'company_id',
            allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 1
            }
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'products',
        timestamps: true,
        paranoid: true
    });

    Product.associate = function(models) {
        Product.hasOne(models.company);
    };

    return Product;
};