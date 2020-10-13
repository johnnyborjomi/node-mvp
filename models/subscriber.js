const {Schema, model} = require('mongoose');

const subscriber = new Schema({
    email: {
        type: String,
        required: true
    },
    createDate: {
        type: String,
        required: true
    }
})

module.exports = model('Subscriber', subscriber);