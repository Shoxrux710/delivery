const { Schema, model } = require('mongoose');

const chequeSchema = new Schema({
    deliveryId: {
        type: Schema.Types.ObjectId,
        ref: 'Delivery',
        required: true
    },
    comment: {
        type: String,
        default: null
    },
    cash: {
        type: Number,
        default: 0
    },
    card: {
        type: Number,
        default: 0
    },
    debt: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = model('Cheque', chequeSchema);