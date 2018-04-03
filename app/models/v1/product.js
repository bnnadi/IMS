'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        product_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        product_name: { 
            type: DataTypes.STRING, 
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 1
            },
        },
        product_code: { 
            type: DataTypes.STRING, 
        },
        description: DataTypes.TEXT
    }, {
        tableName: 'products',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Product.associate = (models) => {
        Product.belongsTo(models.organization, {as: 'oragnization', foreignKey: 'oragnization_id' })
        Product.belongsTo(models.product, {as: 'parentProduct', foreignKey: 'parent_product_id' })
        Product.hasMany(models.product, {as: 'childernProduct', foreignKey: 'parent_product_id', onDelete: 'SET NULL' })
    };
    
    return Product;
}