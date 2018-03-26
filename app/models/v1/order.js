'use strict';

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        order_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        customer_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            },
            
        },
        status: DataTypes.BOOLEAN
    }, {
        tableName: 'orders',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Order.associate = (models) => {
        Order.hasMany(models.order_item, { as: 'orderItem', foreignKey:'order_id', onDelete: 'CASCADE' })
        Order.belongsTo(models.customer, { as: 'customer', foreignKey:'customer_id' })
    };
    
    return Order;
}