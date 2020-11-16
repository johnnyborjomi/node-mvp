// const {Schema, model} = require('mongoose');

// const vacancy = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     salary: {
//         type: Number,
//         required: true,
//     },
//     text: {
//         type: String,
//         required: true
//     },
//     createDate: {
//         type: String,
//         required: true
//     },
//     locations: [String],
//     vacancyType: String,
// })

// module.exports = model('Vacancy', vacancy);


const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const vacancy = sequelize.define('Vacancy', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    locations: {
        type: Sequelize.STRING,
    },
    vacancyType: {
        type: Sequelize.STRING,
    },
});

module.exports = vacancy;