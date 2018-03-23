'use strict';

module.exports = (sequelize, DataTypes) => {
    const InvoiceItem = sequelize.define('invoice_item', {
        invoice_item_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        order_item_id: DataTypes.UUID, // foreign key
        quantity: DataTypes.INTEGER,
        total_cost: DataTypes.STRING
    }, {
        tableName: 'order_items',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    InvoiceItem.associate = (models) => {};
    
    return InvoiceItem;