'use strict';

module.exports = (sequelize, DataTypes) => {
    const OrganizationUnit = sequelize.define('organization_unit', {
        organization_unit_id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        organization_id: DataTypes.UUID,
        parent_organization_unit_id: DataTypes.UUID, // foreign key
        organization_unit_name: DataTypes.STRING,
        other_details: DataTypes.TEXT
    }, {
        tableName: 'organization_units',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    OrganizationUnit.associate = (models) => {};
    
    return OrganizationUnit;
}