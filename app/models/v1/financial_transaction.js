'use strict';

module.exports = (sequelize, DataTypes) => {
    const FinancialTransaction = sequelize.define('financial_transaction', {
        financial_transaction_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        transaction_date: DataTypes.DATE,
        transaction_comment:DataTypes.TEXT,
        other_transaction_details: DataTypes.TEXT
    }, {
        tableName: 'financial_transactions',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    FinancialTransaction.associate = (models) => {
        FinancialTransaction.belongsTo(models.customer,  { foreignKey: 'customer_id' })
        FinancialTransaction.hasOne(models.payment)
        FinancialTransaction.hasOne(models.invoice)
        FinancialTransaction.hasOne(models.transaction_type)
    };
    
    return FinancialTransaction;
}