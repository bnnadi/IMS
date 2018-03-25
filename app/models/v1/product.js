'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        product_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        parent_product_id: { 
            type: DataTypes.UUID,  // foreign key
            allowNull: false,
            defaultValue: null,
        },
        oragnization_id: DataTypes.UUID, // foreign key
        product_name: { 
            type: DataTypes.STRING, 
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 1
            }
        },
        description: DataTypes.TEXT
    }, {
        tableName: 'products',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Product.associate = (models) => {
        this.belongsTo(models.oragnization, {foreignKey: 'oragnization_id'})
        this.belongsTo(models.product, {as: 'parentProduct', foreignKey: 'parent_product_id'})
        this.hasMany(models.product, {as: 'childernProduct', foreignKey: 'parent_product_id'})
    };
    
    return Product;
}