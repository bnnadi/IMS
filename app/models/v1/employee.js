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
            type:   DataTypes.ENUM,
            values: ['male', 'female', 'other']
          },
        dob: { type: DataTypes.DATE },
        last_login_at: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        start_date: { 
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW 
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
        Employee.hasMany(models.timesheet, { as: 'authorizedTimesheets', foreignKey: 'authorizedBythis_id'});
        Employee.hasMany(models.timesheet, { as: 'timesheets', foreignKey: 'timesheetForthis_id', onDelete: 'CASCADE'});
        Employee.hasMany(models.address, { as: 'address', foreignKey: 'employee_id', onDelete: 'CASCADE', constraints: false});
        Employee.hasMany(models.phone_number, { as: 'phone', foreignKey: 'employee_id', onDelete: 'CASCADE', constraints: false});
        Employee.hasOne(models.employee_assignment, {as: 'assignment', foreignKey: 'employee_id', onDelete: 'CASCADE'});
        Employee.hasOne(models.employee_idCard, {as: 'idCard', foreignKey: 'employee_id', onDelete: 'CASCADE'});
        Employee.hasMany(models.employee_assignment, { foreignKey: 'reportsTo_id', onDelete: 'SET NULL', allowNull: true, defaultValue: null });
        Employee.hasMany(models.internal_message_assignment, { as: 'sentMessages', foreignKey: 'msg_from_person_id' });
        Employee.hasMany(models.internal_message_assignment, { as: 'receivedMessages', foreignKey: 'msg_to_person_id' });
        Employee.hasMany(models.image, { foreignKey: 'imageFor_id' });
        Employee.belongsTo(models.image, { as: 'ProfilePicture', foreignKey: 'profilePic_id', constraints: false });
        Employee.hasOne(models.setting, { foreignKey: 'employee_id', onDelete: 'CASCADE'});
    };

    Employee.beforeValidate((employee, options) => {
        employee.password = bcrypt.hashSync(employee.password, bcrypt.genSaltSync());
    });

    Employee.beforeCreate((employee, options) => {
        if (!employee.permission_level_code) {
            employee.permission_level_code = 1;
        }

    });

    Employee.prototype.toJSON = function() {
        var values = Object.assign({}, this.get());
        delete values.password;
        return values;
    };

    Employee.prototype.isValidPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    Employee.prototype.getFullName = function() {
        return [this.firstName, this.lastName].join(' ');
    }

    Employee.prototype.isManager = function() {
        return this.permission_level_code > 3;
    };

    Employee.prototype.canDelete = function() {
        return (_.includes([3, 4], this.permission_level_code));
    };
    
    return Employee;
}