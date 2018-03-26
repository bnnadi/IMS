'use strict';

module.exports = (sequelize, DataTypes) => {
    const PermissionLevel = sequelize.define('permission_level', {
        permission_level_code:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        permission_level_description: DataTypes.STRING
    }, {
        tableName: 'permission_levels',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    PermissionLevel.associate = (models) => {};

    return PermissionLevel;