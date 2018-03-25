'use strict';

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        order_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        customer_id: DataTypes.UUID, // foreign key
        status: DataTypes.BOOLEAN
    }, {
        tableName: 'orders',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Order.associate = (models) => {
        this.hasMany(models.order_item, { foreignKey:'order_id' })
        this.belongsTo(models.customer, { foreignKey:'customer_id' })
    };
    
    return Order;
}