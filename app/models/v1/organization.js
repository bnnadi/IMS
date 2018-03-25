'use strict';

module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('organization', {
        organization_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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

    Organization.associate = (models) => {
        this.hasMany(models.organization_unit, {foreignKey: 'organization_id'});
        this.hasMany(models.product, {foreignKey: 'organization_id'});
    };
    
    return Organization;
}