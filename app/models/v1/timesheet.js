'use strict';

module.exports = (sequelize, DataTypes) => {
    const Timesheet = sequelize.define('timesheet', {
        timesheet_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        organizationUnit_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
        authorizedByEmployee_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
        timesheetForEmployee_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
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
        this.belongsTo(models.employee, { as: 'authorizedBy', foreignKey: 'employee_id'})
        this.belongsTo(models.employee, {foreignKey: 'employee_id'})
        this.belongsTo(models.organization_unit, {foreignKey: 'organization_unit_id'})
    };
    
    return Timesheet;
}