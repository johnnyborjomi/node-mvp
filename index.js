const config = require('./config');
const express = require('express');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const chalk = require('chalk');
const exphbs = require('express-handlebars');
const hbsHelpers = require('./hbs-helpers/helpers');

const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const vacanciesRouter = require('./routes/vacancies');
// const addVacancyRouter = require('./routes/add-vacancy');
const adminAuthRouter = require('./routes/admin/auth');
const adminVacanciesRouter = require('./routes/admin/vacancy');

const varMiddleware = require('./middleware/variables');

const app = express();
const store = new MongoStore({
    collection: 'sessions',
    uri: config.DB_URL
})

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: hbsHelpers
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(csrf());
app.use(flash());
app.use(varMiddleware);

app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/vacancies', vacanciesRouter);
// app.use('/add', addVacancyRouter);
app.use('/admin', adminAuthRouter);
app.use('/admin/vacancy', adminVacanciesRouter);

async function start() {
    try {
        console.log(chalk.yellow(`Connecting to DB URL: ${config.DB_URL}`))
        await mongoose.connect(config.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });

        app.listen(config.PORT, () => {
            console.log(chalk.underline.bold.blue(`Server running at port: ${config.PORT}`));
        })
    } catch(e) {
        console.log(e);
    }
}

start();


