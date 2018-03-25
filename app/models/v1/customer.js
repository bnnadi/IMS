'use strict';

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('customer', {
        customer_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        company: DataTypes.STRING,
        other_details: DataTypes.TEXT
    }, {
        tableName: 'customers',
        timestamps: true,
        underscored: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['email']
              },
        ],
    });

    Customer.associate = (models) => {
        this.hasMany(models.address, { foreignKey: 'person_id' })
        this.hasMany(models.phone_number, { foreignKey: 'person_id' })
        this.hasMany(models.financial_transaction, { foreignKey: 'customer_id' })
        this.hasMany(models.order, { foreignKey:'customer_id' })
        this.hasMany(models.payment, { foreignKey:'customer_id' })
    };
    
    return Customer;
}