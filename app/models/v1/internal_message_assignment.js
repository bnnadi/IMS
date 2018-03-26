'use strict';

module.exports = (sequelize, DataTypes) => {
    const InternalMessageAssignment = sequelize.define('internal_message_assignment', {
        internal_message_assignment_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        msg_from_person_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
        msg_to_person_id: {
            type: DataTypes.UUID, // foreign key
            validate: {
                isUUID: 4,
            }
        },
    }, {
        tableName: 'internal_message_assignments',
        timestamps: true,
        underscored: true,
        paranoid: true
    });

    InternalMessageAssignment.associate = (models) => {
        InternalMessageAssignment.belongsTo(models.employee, { as: 'sender', foreignKey: 'msg_from_person_id' })
        InternalMessageAssignment.belongsTo(models.employee, { as: 'receiver', foreignKey: 'msg_to_person_id' })
    };
    
    return InternalMessageAssignment;
}