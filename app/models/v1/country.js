'use strict';

module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('country', {
        country_code:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        country_name: DataTypes.STRING
    }, {
        tableName: 'countries',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Country.associate = (models) => {};
    
    return Country;
}