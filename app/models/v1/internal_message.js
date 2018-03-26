'use strict';

module.exports = (sequelize, DataTypes) => {
    const InternalMessage = sequelize.define('internal_message', {
        internal_message_assignment_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
        message_subject: DataTypes.STRING,
        message_text: DataTypes.TEXT,
        message_date: DataTypes.DATE
    }, {
        tableName: 'internal_messages',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    InternalMessage.associate = (models) => {
        this.belongsTo(models.internal_message_assignment, { as: 'messageAssignment', foreignKey: 'internal_message_assignment_id' })
    };

    InternalMessage.removeAttribute('id')
    
    return InternalMessage;
}