const {Schema, model} = require('mongoose');

const adminSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
});

module.exports = model('Admin', adminSchema);