'use strict';

module.exports = (sequelize, DataTypes) => {
    const EmployeeAssignment = sequelize.define('employee_assignment', {
        organizationUnit_id: DataTypes.UUID, // foreign key
        employee_id: DataTypes.UUID, // foreign key
        date_from: {
            type: DataTypes.DATE,
            primaryKey: true
        },
        reportsTo_id: DataTypes.UUID, // foreign key
        role_code: DataTypes.UUID // foreign key
    }, {
        tableName: 'employee_assignments',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    EmployeeAssignment.associate = (models) => {};
    
    return EmployeeAssignment;
}