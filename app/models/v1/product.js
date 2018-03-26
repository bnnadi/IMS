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
            validate: {
                isUUID: 4,
            }
        },
        oragnization_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
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
        Product.belongsTo(models.oragnization, {foreignKey: 'oragnization_id'})
        Product.belongsTo(models.product, {as: 'parentProduct', foreignKey: 'parent_product_id'})
        Product.hasMany(models.product, {as: 'childernProduct', foreignKey: 'parent_product_id'})
    };
    
    return Product;
}