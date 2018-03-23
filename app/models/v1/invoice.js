'use strict';

module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define('invoice', {
        invoice_number:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        order_id: DataTypes.UUID, // foreign key
    }, {
        tableName: 'invoices',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Invoice.associate = (models) => {};
    
    return Invoice;
}