'use strict';

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        order_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        customer_id: DataTypes.UUID, // foreign key
        status: DataTypes.BOOLEAN
    }, {
        tableName: 'orders',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Order.associate = (models) => {};
    
    return Order;
}