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
    status: {
        type: String,
        enum: ['inCour', 'process-Cour', 'inManager'],
        required: true,
        default: 'inCour'
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = model('Process', processSchema)