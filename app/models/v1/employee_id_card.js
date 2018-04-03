'use strict';

module.exports = (sequelize, DataTypes) => {
    const EmployeeIdCard = sequelize.define('employee_idCard', {
        employee_idCard_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCard_no: DataTypes.INTEGER,
        idCard_qr: DataTypes.STRING,
        replacement_no: DataTypes.INTEGER,
        other_details: DataTypes.TEXT
    }, {
        tableName: 'employee_idCards',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    EmployeeIdCard.associate = (models) => {};
    
    return EmployeeIdCard;
}