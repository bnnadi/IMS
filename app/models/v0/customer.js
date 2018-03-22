"use strict";

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
        customerName: {
            type: DataTypes.STRING,
            field: 'customer_name'
        },
        email: {
            type: DataTypes.STRING,
            vaildate: {
                notNull: true,
                isEmail: true
            }
        },
        companyName: {
            type: DataTypes.STRING,
            field: 'company_name'
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'customers',
        timestamps: true,
        paranoid: true
    });

    Customer.associate = function(models) {
        Customer.Address = Customer.hasMany(models.address);
        Customer.Phone = Customer.hasMany(models.phone_number);
    };

    return Customer;
};