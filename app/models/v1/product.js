'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        product_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        parent_product_id: DataTypes.UUID, // foreign key
        oragnization_id: DataTypes.UUID, // foreign key
        product_name: DataTypes.STRING,
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

    Product.associate = (models) => {};
    
    return Product;
}