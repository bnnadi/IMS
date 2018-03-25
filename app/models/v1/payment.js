'use strict';

module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('payment', {
        payment_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        customer_id: DataTypes.UUID, // foreign key
        amount_due: DataTypes.STRING,
        reminder_sent_yn: DataTypes.STRING,
        date_reminder_sent: DataTypes.DATE,
        date_paid: DataTypes.STRING,
        amount_paid: DataTypes.STRING,
        other_details: DataTypes.STRING,
    }, {
        tableName: 'payments',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Payment.associate = (models) => {
        this.belongsTo(models.customer, { foreignKey: 'customer_id' })
    };
    
    return Payment;
}