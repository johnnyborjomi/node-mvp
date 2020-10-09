
const DB_NAME = 'nodemvpVacancies';
const DB_PASS = 'BYSTJ4CAf9RC7zC7';
const DB_URL = `mongodb+srv://johnnyborjomi:${DB_PASS}@cluster0.ksxcu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = {
    DB_PASS,
    DB_URL,
    PORT: process.env.PORT || 3000,
    SESSION_SECRET: 'SOME SECRET VALUE'
};