const { Schema, model } = require('mongoose');

const processAdminSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    processManagers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ProcessManager',
            required: true
        }
    ],
    status: {
        type: String,
        enum: ['admin', 'finish'],
        required: true,
        default: 'admin'
    }
})

module.exports = model('ProcessAdmin', processAdminSchema)