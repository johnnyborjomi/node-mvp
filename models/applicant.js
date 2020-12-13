// const {Schema, model} = require('mongoose');

// const applicant = new Schema({
//     fullName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     cv: {
//         name: String,
//         file: {
//             data: Buffer, 
//             contentType: String 
//         }
//     },
//     message: {
//         type: String,
//         required: true
//     },
//     createDate: {
//         type: String,
//         required: true
//     },
//     vacancyId: {
//         type: Schema.Types.ObjectId,
//         required: true,
//         ref: 'Vacancy'
//     }
// })

// module.exports = model('Applicant', applicant);



const Sequelize = require('sequelize');
const {sequelize} = require('../utils/database');
const vacancy = require('./vacancy');

const applicant = sequelize.define('Applicant', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cv: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createDate: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
applicant.belongsTo(vacancy);
vacancy.hasMany(applicant);

module.exports = applicant;