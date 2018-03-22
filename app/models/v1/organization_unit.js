'use strict';

module.exports = (sequelize, DataTypes) => {
    const OrganizationUnit = sequelize.define('organization_unit', {
        organization_id: DataTypes.UUID,
        parent_organization_unit_id: DataTypes.INTEGER,
        organization_unit_name: DataTypes.STRING,
        otherDetails: DataTypes.TEXT
    }, {
        tableName: 'organization_units',
        timestamps: true,
        paranoid: true
    });

    OrganizationUnit.associate = (models) => {};
    
    return OrganizationUnit;
}