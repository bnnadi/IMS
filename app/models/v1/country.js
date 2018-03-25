'use strict';

module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('country', {
        country_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        country_code: DataTypes.STRING,
        country_local: DataTypes.STRING,
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