const { Schema, model } = require('mongoose');

const deliverySchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    courierId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['not_delivery', 'delivered'],
        default: 'not_delivery'
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = model('Delivery', deliverySchema)