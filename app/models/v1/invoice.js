'use strict';

module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define('invoice', {
        invoice_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        invoice_number:{
            type: DataTypes.STRING
        },
        order_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            },
            
        },
    }, {
        tableName: 'invoices',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Invoice.associate = (models) => {
        // Invoice.hasOne(models.order, { foreignKey: 'order_id'})
        Invoice.hasMany(models.invoice_line_item, { as: 'lineItem', foreignKey:'invoice_id', onDelete: 'CASCADE' })
        // Invoice.belongsTo(models.financial_transaction, { foreignKey: 'invoice_id' })
    };
    
    return Invoice;
}