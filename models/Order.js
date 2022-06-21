const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    agentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: ['active', 'courier', 'completed', 'rejected'],
        default: 'active',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = model('Order', orderSchema)