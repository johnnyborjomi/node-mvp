const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);

const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const sequelizeSessionStore = new SessionStore({
    db: sequelize,
});

module.exports = {sequelize, sequelizeSessionStore, session};