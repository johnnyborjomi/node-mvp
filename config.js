const BASE_URL = 'http://localhost:3000'
const DB_NAME = 'vacancies-project';
const DB_USER = 'root';
const DB_PASSWORD = '12345678';
const MAIL_SERVICE = 'gmail';
const MAIL_ACCOUNT = 'nodemailer.johnnyborjomi@gmail.com';
const MAIL_PASS = 'NodemailerJohnnypass86';

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
};