const { Schema, model } = require('mongoose')

const processDateSchema = new Schema({
    fromStatus: String,
    toStatus: String,
    date: {
        type: Date,
        required: true
    },
    isRefusal: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    processId: {
        type: Schema.Types.ObjectId,
        ref: 'Process',
    },
    processManagerId: {
        type: Schema.Types.ObjectId,
        ref: 'ProcessManager',
    }

})

module.exports = model('ProcessDate', processDateSchema)