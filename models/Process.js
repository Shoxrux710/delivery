const { Schema, model } = require('mongoose');

const processSchema = new Schema({
    courierId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cheques: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cheque',
            required: true
        }
    ],
    processId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Process',
            required: true
        }
    ],
    status: {
        type: String,
        enum: ['inCour', 'process-Cour', 'inManager', 'processAdmin', 'admin', 'finish'],
        required: true,
        default: 'inCour'
    }
})

module.exports = model('Process', processSchema)