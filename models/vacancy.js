const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/database');

const vacancy = sequelize.define('Vacancy', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    locations: {
        type: DataTypes.TEXT,
        get() {
            const data = this.getDataValue('locations');
            return JSON.parse(data);
        },
        set(val) {
            this.setDataValue('locations', JSON.stringify(val));
        },
    },
    vacancyType: {
        type: DataTypes.STRING,
    },
});

module.exports = vacancy;