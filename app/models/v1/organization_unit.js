'use strict';

module.exports = (sequelize, DataTypes) => {
    const OrganizationUnit = sequelize.define('organization_unit', {
        organization_unit_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        organization_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
        parent_organization_unit_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
        organization_unit_name: DataTypes.STRING,
        other_details: DataTypes.TEXT
    }, {
        tableName: 'organization_units',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    OrganizationUnit.associate = (models) => {
        this.belongsTo(models.organization_unit, {as: 'parentUnit', foreignKey: 'parent_organization_unit_id'})
        this.belongsTo(models.organization, {foreignKey: 'organization_id'});
    };
    
    return OrganizationUnit;
}