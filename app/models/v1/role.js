'use strict';

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        role_code:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_description: DataTypes.STRING
    }, {
        tableName: 'roles',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Role.associate = (models) => {};

    return Role;
}