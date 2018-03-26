'use strict';

module.exports = (sequelize, DataTypes) => {
    const InvoiceItem = sequelize.define('invoice_item', {
        invoice_number:{
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
        order_item_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
        quantity: DataTypes.INTEGER,
        total_cost: DataTypes.STRING
    }, {
        tableName: 'invoice_items',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    InvoiceItem.associate = (models) => {
        this.hasOne(models.order_item, {foreignKey: 'order_item_id'});
        this.belongsTo(models.invoice, {foreignKey: 'invoice_number'})
    };

    InvoiceItem.removeAttribute('id');
    
    return InvoiceItem;