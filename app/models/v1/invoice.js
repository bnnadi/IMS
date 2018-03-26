'use strict';

module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define('invoice', {
        invoice_number:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        order_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
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