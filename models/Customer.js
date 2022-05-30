const {Schema, model} = require('mongoose')

const customerSchema = new Schema({
    fullname: {
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
    shopNumber: {
        type: Number,
        required: true
    },
    phone: { 
        type: String,
        required: true
    },
    phoneTwo: { 
        type: String
    },
    customerImage: {
        fileName: String
    }
})

module.exports = model('Customer', customerSchema)