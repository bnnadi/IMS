"use strict";

module.exports = function(sequelize, DataTypes) {
    var ProductOrder = sequelize.define("productOrder", {
        productId: {
            type: DataTypes.INTEGER,
            field: 'product_id'
        },
        orderId: {
            type: DataTypes.INTEGER,
            field: 'order_id'
        },
        product_qty: DataTypes.STRING,
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'products_orders',
        timestamps: true,
        paranoid: true
    });

    ProductOrder.associate = function(models) {};

    return ProductOrder;
};