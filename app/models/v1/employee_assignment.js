'use strict';

module.exports = (sequelize, DataTypes) => {
    const EmployeeAssignment = sequelize.define('employee_assignment', {
        organizationUnit_id: { 
            type: DataTypes.UUID, // foreign key
            allowNull: false,
            validate: {
                isUUID: 4,
            },
        },
        employee_id: { 
            type:DataTypes.UUID, // foreign key
            allowNull: false,
            validate: {
                isUUID: 4,
            },
        },
        date_from: {
            type: DataTypes.DATE,
            primaryKey: true
        },
        reportsTo_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            },
            allowNull: true,
            defaultValue: null
        },
        role_code: { 
            type: DataTypes.INTEGER, // foreign key
            validate: {
                isInt: true,
            }
        }
    }, {
        tableName: 'employee_assignments',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    EmployeeAssignment.associate = (models) => {
        EmployeeAssignment.hasOne(models.organization_unit, {as: 'unitName', foreignKey: 'organizationUnit_id' })
        EmployeeAssignment.belongsTo(models.employee, { foreignKey: 'employee_id' })
        EmployeeAssignment.belongsTo(models.employee, {as: 'supervisor', foreignKey: 'reportsTo_id', allowNull: true, defaultValue: null })
        // EmployeeAssignment.hasOne(models.role, {as: 'role', foreignKey: 'role_code', onDelete: 'NO ACTION', onUpdate: 'NO ACTION', constraints: false })
    };

    EmployeeAssignment.removeAttribute('id')
    
    return EmployeeAssignment;
}