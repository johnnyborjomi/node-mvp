const {Schema, model} = require('mongoose');

const vacancy = new Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    createDate: {
        type: String,
        required: true
    }
})

module.exports = model('Vacancy', vacancy);