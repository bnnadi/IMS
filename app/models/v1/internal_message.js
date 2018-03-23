'use strict';

module.exports = (sequelize, DataTypes) => {
    const InternalMessage = sequelize.define('internal_message', {
        internal_message_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        msg_from_person_id: DataTypes.UUID, // foreign key
        msg_to_person_id: DataTypes.UUID, // foreign key
        message_subject: DataTypes.STRING,
        message_text: DataTypes.TEXT,
    }, {
        tableName: 'internal_messages',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    InternalMessage.associate = (models) => {};
    
    return InternalMessage;
}