// const {Schema, model} = require('mongoose');

// const adminSchema = new Schema({
//     login: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String
//     }
// });

// module.exports = model('Admin', adminSchema);

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const adminSchema = sequelize.define('Admin', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING
    }
});

module.exports = adminSchema;