const { Schema, model } = require('mongoose');

const processManagerSchema = new Schema({
    managerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    processId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Process',
            required: true
        }
    ],
    status: {
        type: String,
        enum: ['inManager', 'processAdmin', 'admin', 'finish'],
        required: true,
        default: 'inManager'
    }
})

module.exports = model('ProcessManager', processManagerSchema)