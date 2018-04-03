'use strict';

module.exports = (sequelize, DataTypes) => {
    const PhoneNumber = sequelize.define('phone_number', {
        phone_number_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone_number: DataTypes.STRING
    }, {
        tableName: 'phone_numbers',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    PhoneNumber.associate = (models) => {};
    
    return PhoneNumber;
}