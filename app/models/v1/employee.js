'use strict';

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employee', {
        employee_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        permission_level_code: DataTypes.UUID,  // foreign key
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        gender: DataTypes.STRING,
        dob: DataTypes.DATE,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        address: DataTypes.TEXT,
        other_details: DataTypes.TEXT
    }, {
        tableName: 'employees',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Employee.associate = (models) => {
        Employee.belongsTo(models.timesheet, {foreignKey: 'fk_authorisedBy', targetKey: 'employee_id'})
        Employee.belongsTo(models.timesheet, {foreignKey: 'fk_timesheetFor', targetKey: 'employee_id'});
    };
    
    return Employee;
}