const BASE_URL = 'http://localhost:3000'
const DB_NAME = 'vacancies-project';
const DB_USER = 'root';
const DB_PASSWORD = '12345678';
const MAIL_SERVICE = 'gmail';
const MAIL_ACCOUNT = 'nodemailer.johnnyborjomi@gmail.com';
const MAIL_PASS = 'NodemailerJohnnypass86';
const SESSION_STORE_OPTIONS = {
    host: 'localhost',
    port: 3306,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
}

module.exports = {
    BASE_URL,
    DB_PASSWORD,
    DB_NAME,
    DB_USER,
    PORT: process.env.PORT || 3000,
    SESSION_SECRET: 'SOME SECRET VALUE',
    MAIL_SERVICE,
    MAIL_ACCOUNT,
    MAIL_PASS,
    SESSION_STORE_OPTIONS
};