'use strict';

module.exports = (sequelize, DataTypes) => {
    const EmployeeAssignment = sequelize.define('employee_assignment', {
        date_from: {
            type: DataTypes.DATE,
            primaryKey: true,
            validate: {
                isDate: true,
            },
        },
    }, {
        tableName: 'employee_assignments',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    EmployeeAssignment.associate = (models) => {
        EmployeeAssignment.belongsTo(models.organization_unit, {as: 'unitName', foreignKey: 'organizationUnit_id' })
        EmployeeAssignment.belongsTo(models.role)
    };

    EmployeeAssignment.removeAttribute('id')

    EmployeeAssignment.beforeValidate((assignment, options) => {
        assignment.date_from = ( !assignment.date_from ) ? new Date() : assignment.date_from;
    });
    
    return EmployeeAssignment;
}