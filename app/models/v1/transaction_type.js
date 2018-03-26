'use strict';

module.exports = (sequelize, DataTypes) => {
    const TransactionType = sequelize.define('transaction_type', {
        transaction_type_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_type_name: DataTypes.STRING
    }, {
        tableName: 'transaction_types',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    TransactionType.associate = (models) => {
        // TransactionType.belongsTo(models.financial_transaction, { foreignKey: 'transaction_type_id' })
    };
    
    return TransactionType;
}