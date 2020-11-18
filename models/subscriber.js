// const {Schema, model} = require('mongoose');

// const subscriber = new Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     createDate: {
//         type: String,
//         required: true
//     }
// })

// module.exports = model('Subscriber', subscriber);



const Sequelize = require('sequelize');
const {sequelize} = require('../utils/database');

const subscriber = sequelize.define('Subscriber', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = subscriber;