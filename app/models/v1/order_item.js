'use strict';

module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('order_item', {
        order_item_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        order_id: DataTypes.UUID, // foreign key
        product_id: DataTypes.UUID, // foreign key
        price: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    }, {
        tableName: 'order_items',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    OrderItem.associate = (models) => {
        this.hasOne(models.product, {foreignKey: 'product_id'});
    };
    
    return OrderItem;
}