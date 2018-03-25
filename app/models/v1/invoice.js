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

    Invoice.associate = (models) => {
        this.hasOne(models.order, { foreignKey: 'order_id' })
        this.hasMany(models.invoice_item, { foreignKey:'invoice_number' })
    };
    
    return Invoice;
}