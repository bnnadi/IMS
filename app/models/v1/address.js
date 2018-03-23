'use strict';

module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('address', {
        address_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        person_id: DataTypes.UUID, // foreign key
        address_line_1: DataTypes.STRING,
        address_line_2: DataTypes.STRING,
        address_line_3: DataTypes.STRING,
        address_line_4: DataTypes.STRING,
        town_city: DataTypes.STRING,
        state_county_province: DataTypes.STRING,
        country: DataTypes.STRING,
        other_details: DataTypes.TEXT
    }, {
        tableName: 'addresses',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Address.associate = (models) => {};
    
    return Address;
}