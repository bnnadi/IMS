'use strict';

module.exports = (sequelize, DataTypes) => {
    const RefRole = sequelize.define('ref_role', {
        role_code:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        role_description: DataTypes.STRING
    }, {
        tableName: 'ref_roles',
        timestamps: true,
        paranoid: true
    });

    RefRole.associate = (models) => {};
    
    return RefRole;
}