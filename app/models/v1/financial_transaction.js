'use strict';

module.exports = (sequelize, DataTypes) => {
    const FinancialTransaction = sequelize.define('financial_transaction', {
        financial_transaction_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        customer_id: DataTypes.UUID, // foreign key
        invoice_number: DataTypes.UUID, // foreign key
        payment_id: DataTypes.UUID, // foreign key
        transaction_type_code: DataTypes.UUID, // foreign key
        transaction_date: DataTypes.DATE,
        transaction_comment:DataTypes.TEXT,
        other_transaction_details: DataTypes.TEXT
    }, {
        tableName: 'financial_transactions',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    FinancialTransaction.associate = (models) => {};
    
    return FinancialTransaction;
}