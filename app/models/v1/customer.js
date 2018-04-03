'use strict';

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('customer', {
        customer_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        company: DataTypes.STRING,
        other_details: DataTypes.TEXT
    }, {
        tableName: 'customers',
        timestamps: true,
        underscored: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['email']
              },
        ],
    });

    Customer.associate = (models) => {
        Customer.hasMany(models.address, { as: 'address',  foreignKey:'customer_id', onDelete: 'CASCADE', constraints: false})
        Customer.hasMany(models.phone_number, { as: 'phone', foreignKey:'customer_id', onDelete: 'CASCADE', constraints: false})
        Customer.hasMany(models.financial_transaction, { as: 'financial', foreignKey: 'customer_id', onDelete: 'CASCADE', })
        Customer.hasMany(models.order, { as: 'order', foreignKey:'customer_id', onDelete: 'CASCADE', })
        Customer.hasMany(models.payment, { as: 'payment', foreignKey:'customer_id', onDelete: 'CASCADE', })
    };
    
    return Customer;
}