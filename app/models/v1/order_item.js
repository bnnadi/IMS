'use strict';

module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('order_item', {
        order_item_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            },
            
        },
        price: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    }, {
        tableName: 'order_items',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    OrderItem.associate = (models) => {
        OrderItem.hasOne(models.product);
        OrderItem.belongsTo(models.invoice_line_item, { foreignKey: 'order_item_id' });
    };

    OrderItem.removeAttribute('id');
    
    return OrderItem;
}