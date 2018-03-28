'use strict';

module.exports = (sequelize, DataTypes) => {
    const InvoiceLineItem = sequelize.define('invoice_line_item', {
        invoice_id:{
            type: DataTypes.INTEGER, // foreign key
            validate: {
                isInt: true,
            },
        },
        order_item_id: {
            type: DataTypes.INTEGER, // foreign key
            validate: {
                isInt: true,
            },
        },
        quantity: DataTypes.INTEGER,
        total_cost: DataTypes.STRING
    }, {
        tableName: 'invoice_line_items',
        timestamps: true,
        underscored: true,
        paranoid: true
    });
    
    InvoiceLineItem.removeAttribute('id')

    InvoiceLineItem.associate = (models) => {
        // InvoiceLineItem.hasOne(models.order_item, { foreignKey: 'order_item_id', constraints: false  });
        InvoiceLineItem.belongsTo(models.invoice, { foreignKey: 'invoice_id' })
    };
    
    return InvoiceLineItem;
}