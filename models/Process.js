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
            required: true
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'received', 'refusal'],
        required: true
    },
    issuedDate: {
        type: Date,
        required: true
    },
    recdDate: {
        type: Date,
        default: null
    }
})

module.exports = model('Process', processSchema)