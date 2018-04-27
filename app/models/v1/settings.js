'use strict';

module.exports = (sequelize, DataTypes) => {
    const Setting = sequelize.define('setting', {
        locale: {
            type: DataTypes.STRING(8),
            defaultValue: 'en'
        },
        layout_theme: {
            type: DataTypes.STRING(29),
            defaultValue: 'themedefault'
        },
        topbar_theme: {
            type: DataTypes.STRING(20),
            defaultValue: 'themedefault'
        },
        sidebar_theme: {
            type: DataTypes.STRING(20),
            defaultValue: 'themedefault'
        },
    }, {
        tableName: 'settings',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Setting.associate = (models) => {};

    return Setting;
}