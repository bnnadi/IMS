'use strict';

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employee', {
        employee_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        permission_level_code: {
            type: DataTypes.UUID,
            references: {
                model: PermissionLevel,
                key: 'permission_level_code',
            }
        },  // foreign key
        first_name: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type:   Sequelize.ENUM,
            values: ['male', 'female', 'other']
          },
        dob: { type: DataTypes.DATE },
        profile_img: { type: DataTypes.STRING },
        start_date: { 
            type: DataTypes.DATE,
            defaultValue:  new Date() 
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            validate: {
                isDate: true
            }
        },
        other_details: { type: DataTypes.TEXT }
    }, {
        tableName: 'employees',
        timestamps: true,
        underscored: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['email']
              },
        ],
        scopes: {
            deleted: {
                where: {
                  deleted: true
                }
              },
              activeUsers: {
                where: { 
                    end_date: null 
                }
              },
        }
    });

    Employee.associate = (models) => {
        this.hasMany(models.timesheet, {as: 'authorizedTimesheets', foreignKey: 'authorizedBythis_id'});
        this.hasMany(models.timesheet, {foreignKey: 'timesheetForthis_id'});
        this.hasMany(models.address, { foreignKey: 'person_id' })
        this.hasMany(models.phone_number, { foreignKey: 'person_id' })
        this.hasMany(models.internal_message_assignment, { as: 'sentMessages', foreignKey: 'msg_from_person_id' })
        this.hasMany(models.internal_message_assignment, { as: 'receivedMessages', foreignKey: 'msg_to_person_id' })
    };

    Employee.prototype.getFullName = () => {
        return this.first_name + " " + this.last_name;
    }

    Employee.prototype.isManager = () => {
        return;
    }
    
    return Employee;
}