'use strict';
var _ = require('lodash');
var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        accountType: {
            type: DataTypes.ENUM,
            values: ['admin', 'agent', 'guard', 'pmanager', 'smanager', 'worker']
        },
        email: {
            type: DataTypes.STRING,
            vaildate: {
                notNull: true,
                isEmail: true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        password: {
            type: DataTypes.STRING(255),
            vaildate: {
                notNull: true
            }
        },
        companyId: {
            type: DataTypes.INTEGER,
            field: 'company_id',
            allowNull: false
        },
        lastloginAt: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'users',
        paranoid: true
    });

    User.associate = function(models) {
        User.Address = User.hasMany(models.address);
        User.Company = User.hasOne(models.company);
        User.Phone = User.hasMany(models.phone_number);
    };

    User.beforeValidate(function(user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    });

    User.beforeCreate(function(user, options) {
        if ('admin' === user.accountType) {
            user.companyId = 0;
        }
    });

    User.prototype.toJSON = function() {
        var values = Object.assign({}, this.get());
        delete values.password;
        return values;
    };

    User.prototype.isValidPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.prototype.getFullName = function() {
        return [this.firstName, this.lastName].join(' ');
    };

    User.prototype.isManager = function() {
        return (_.includes(['admin', 'pmanager', 'smanager'], this.accountType));
    };

    User.prototype.canDelete = function() {
        return (_.includes(['admin', 'pmanager'], this.accountType));
    };

    User.prototype.getAccess = function() {
        return (this.companyId === 0) ? 'full' : (this.companyId === 1) ? 'yana' : 'willow';
    };

    return User;
};