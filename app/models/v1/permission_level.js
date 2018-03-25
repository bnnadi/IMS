'use strict';

module.exports = (sequelize, DataTypes) => {
    const PermissionLevel = sequelize.define('permission_level', {
        permission_level_code:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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