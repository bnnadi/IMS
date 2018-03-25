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

    EmployeeAssignment.associate = (models) => {
        this.hasOne(models.organization_unit, {as: 'unitName', foreignKey: 'organizationUnit_id' })
        this.belongsTo(models.employee, { foreignKey: 'employee_id' })
        this.hasOne(models.employee, {as: 'supervisor', foreignKey: 'reportsTo_id' })
        this.hasOne(models.role, {as: 'role', foreignKey: 'role_code' })
    };
    
    return EmployeeAssignment;
}