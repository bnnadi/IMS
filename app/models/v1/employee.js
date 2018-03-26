'use strict';
var _ = require('lodash');
var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employee', {
        employee_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        permission_level_code: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: true,
            }
        },  
        first_name: { 
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
              len: [0, 50],
            }
         },
        last_name: { 
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
              len: [0, 100],
            }
         },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
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
        last_login_at: {
            type: DataTypes.DATE,
            defaultValue: null
        },
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
        this.hasMany(models.address, { foreignKey: 'person_id' });
        this.hasMany(models.phone_number, { foreignKey: 'person_id' });
        this.hasMany(models.internal_message_assignment, { as: 'sentMessages', foreignKey: 'msg_from_person_id' });
        this.hasMany(models.internal_message_assignment, { as: 'receivedMessages', foreignKey: 'msg_to_person_id' });
        this.hasMany(models.permission_level, { foreignKey: 'permission_level_code' });
    };

    Employee.beforeValidate((employee, options) => {
        employee.password = bcrypt.hashSync(employee.password, bcrypt.genSaltSync());
    });

    Employee.beforeCreate((employee, options) => {
        if (!employee.permission_level_code) {
            employee.permission_level_code = 1;
        }
    });

    Employee.prototype.isValidPassword = (password) => {
        return bcrypt.compareSync(password, this.password);
    };

    Employee.prototype.getFullName = () => {
        return [this.firstName, this.lastName].join(' ');
    }

    Employee.prototype.isManager = () => {
        return this.permission_level_code > 3;
    };

    Employee.prototype.canDelete = () => {
        return (_.includes([3, 4], this.permission_level_code));
    };
    
    return Employee;
}