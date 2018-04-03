'use strict';

module.exports = (sequelize, DataTypes) => {
    const Timesheet = sequelize.define('timesheet', {
        timesheet_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        start_date: { 
            type: DataTypes.DATE,
            validate: {
                isDate: true,
            },
        },
        end_date: { 
            type: DataTypes.DATE,
            validate: {
                isDate: true,
            },
        },
        other_details: DataTypes.TEXT
    }, {
        tableName: 'timesheets',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Timesheet.associate = (models) => {
        Timesheet.belongsTo(models.employee, { as: 'authorizedByEmployee_id', foreignKey: 'employee_id'})
        Timesheet.belongsTo(models.employee, {as: 'timesheetForEmployee_id', foreignKey: 'employee_id'})
        Timesheet.belongsTo(models.organization_unit, {as: 'organizationUnit_id', foreignKey: 'organization_unit_id'})
    };
    
    return Timesheet;
}