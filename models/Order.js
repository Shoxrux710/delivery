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
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'courier', 'completed', 'rejected']
    }

})

module.exports = model('Order', orderSchema)