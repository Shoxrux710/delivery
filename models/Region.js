const {Schema, model} = require('mongoose')

const regionSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = model('Region', regionSchema)