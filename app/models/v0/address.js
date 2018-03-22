"use strict";

module.exports = function(sequelize, DataTypes) {
    var Address = sequelize.define("address", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        type: {
            type: DataTypes.ENUM,
            values: ['customer', 'employee']
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        isPrimray: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'addresses',
        timestamps: true,
        paranoid: true
    });

    Address.associate = function(models) {
        Address.belongsTo(models.user);
    };

    return Address;
};