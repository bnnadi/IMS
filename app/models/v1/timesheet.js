'use strict';

module.exports = (sequelize, DataTypes) => {
    const Timesheet = sequelize.define('timesheet', {
        timesheet_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        organizationUnit_id: DataTypes.UUID, // foreign key
        authorisedByEmployee_id: DataTypes.UUID, // foreign key
        timesheetForEmployee_id: DataTypes.UUID, // foreign key
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        other_details: DataTypes.TEXT
    }, {
        tableName: 'timesheets',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Timesheet.associate = (models) => {
        Timesheet.hasMany(models.employee, {foreignKey: 'fk_authorisedBy', sourceKey: 'authorisedByEmployeeId'})
        Timesheet.hasMany(models.employee, {foreignKey: 'fk_timesheetFor', sourceKey: 'timesheetForEmployeeId'})
        Timesheet.hasMany(models.organization_unit, {foreignKey: 'fk_organizationUnit', sourceKey: 'organizationUnitId'})
    };
    
    return Timesheet;
}