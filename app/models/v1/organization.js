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
        other_details: DataTypes.TEXT
    }, {
        tableName: 'organizations',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Organization.associate = (models) => {
        Organization.hasMany(models.organization_unit, {as: 'unit', foreignKey: 'organization_id'});
        Organization.hasMany(models.product, { as: 'product', foreignKey: 'organization_id'});
    };
    
    return Organization;
}