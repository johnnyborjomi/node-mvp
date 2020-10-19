
const BASE_URL = 'http://localhost:3000'
const DB_NAME = 'nodemvpVacancies';
const DB_PASS = 'BYSTJ4CAf9RC7zC7';
const DB_URL = `mongodb+srv://johnnyborjomi:${DB_PASS}@cluster0.ksxcu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const MAIL_SERVICE = 'gmail';
const MAIL_ACCOUNT = 'nodemailer.johnnyborjomi@gmail.com';
const MAIL_PASS = 'NodemailerJohnnypass86';

module.exports = {
    BASE_URL,
    DB_PASS,
    DB_URL,
    PORT: process.env.PORT || 3000,
    SESSION_SECRET: 'SOME SECRET VALUE',
    MAIL_SERVICE,
    MAIL_ACCOUNT,
    MAIL_PASS,
};