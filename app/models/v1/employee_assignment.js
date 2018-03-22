'use strict';

module.exports = (sequelize, DataTypes) => {
    const EmployeeAssignment = sequelize.define('employee_assignment', {
        employee_assignment_id:{
            type: DataTypes.UUID,
        },
        organizationUnit_id: DataTypes.UUID, // foreign key
        date_from: {
            DataTypes.DATE,
            primaryKey: true
        },
        reportsTo_id: DataTypes.UUID, // foreign key
        role_code: DataTypes.UUID // foreign key
    }, {
        tableName: 'employee_assignments',
        timestamps: true,
        paranoid: true
    });

    EmployeeAssignment.associate = (models) => {};
    
    return EmployeeAssignment;
}