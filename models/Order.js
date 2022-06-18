const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    customer: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    fog: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    twoPhone: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'courier', 'delivered', 'completed', 'rejected'],
        default: 'active'
    },
    productArray: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            number: {
                type: Number,
                required: true
            },
        }
    ],
    agentId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    courId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    randomId: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        default: null
    },
    cash: {
        type: Number,
        default: null
    },
    plastic: {
        type: Number,
        default: null
    },
    debt: {
        type: Number,
        default: null
    },
    date: {
        type: Date,
        required: true
    }

})

module.exports = model('Order', orderSchema)