'use strict';

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        image_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imageFor_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        other_details: DataTypes.TEXT
    }, {
        tableName: 'images',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    Image.associate = (models) => {};
    
    return Image;
}