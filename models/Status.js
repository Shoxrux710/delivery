const { Schema, model } = require('mongoose');

const statusSchema = new Schema({
    status: {
        type: String,
        enum: ['active', 'courier', 'delivered', 'completed', 'rejected'],
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = model('Status', statusSchema);