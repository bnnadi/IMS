'use strict';

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('customer', {
        customer_id:{
            type: DataTypes.UUID,
            primaryKey: true
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
        paranoid: true
    });

    Customer.associate = (models) => {};
    
    return Customer;
}