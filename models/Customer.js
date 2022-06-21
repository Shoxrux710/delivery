const {Schema, model, Types} = require('mongoose')

const customerSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    regionId: {
        type: Schema.Types.ObjectId,
        ref: 'Region',
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