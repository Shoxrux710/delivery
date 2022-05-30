const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    customer:{
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
    phone:{
        type: String,
        required: true
    },
    twoPhone: {
        type: String
    },
    number: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'courier', 'completed', 'rejected'],
        default: 'active'
    },
    productId: {
       type: Schema.Types.ObjectId,
       ref: 'Product'   
    },
    courId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    randomId: {
        type: Number,
        required: true
    }

})

module.exports = model('Order', orderSchema)