"use strict";

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("order", {
        customerId: {
            type: DataTypes.INTEGER,
            field: 'customer_id'
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        },
        orderName: {
            type: DataTypes.STRING,
            field: 'order_name'
        }
    }, {
        tableName: 'orders',
        timestamps: true,
        paranoid: true
    });

    Order.associate = function(models) {};

    return Order;
};