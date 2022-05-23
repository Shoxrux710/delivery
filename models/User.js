const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    regionId: {
        type: Schema.Types.ObjectId,
        ref: 'Region'
    },
    phone: { 
        type: String,
        required: true
    },
    worker: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null
        }
    ],
    position: {
        type: String,
        enum: ['admin', 'manager', 'agent', 'courier']
    }
})

module.exports = model('User', userSchema)