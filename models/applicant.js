const {Schema, model} = require('mongoose');

const applicant = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cv: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createDate: {
        type: String,
        required: true
    },
    vacancyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Vacancy'
    }
})

module.exports = model('Applicant', applicant);