'use strict';

module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('organization', {
        organization_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        organization_name: DataTypes.STRING,
        address: DataTypes.TEXT,
        otherDetails: DataTypes.TEXT
    }, {
        tableName: 'organizations',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Organization.associate = (models) => {};
    
    return Organization;
}