const config = require('./config');
const express = require('express');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');
const {sequelize, sequelizeSessionStore, session} = require('./utils/database');

const chalk = require('chalk');
const exphbs = require('express-handlebars');
const hbsHelpers = require('./hbs-helpers/helpers');

const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const vacanciesRouter = require('./routes/vacancies');
const adminAuthRouter = require('./routes/admin/auth');
const adminVacanciesRouter = require('./routes/admin/vacancy');
const mailRouter = require('./routes/mail');
const subscribersRouter = require('./routes/admin/subscribers');
const applicantsRouter = require('./routes/admin/applicants');
const applyRouter = require('./routes/apply');
const errorHandler = require('./middleware/error');

const varMiddleware = require('./middleware/variables');
const fileMiddleware = require('./middleware/file');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: hbsHelpers
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cv', express.static(path.join(__dirname, 'cv')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: config.SESSION_SECRET,
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
}));
app.use(fileMiddleware.single('cv'));
// app.use(csrf());
app.use(flash());
app.use(varMiddleware);

app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/vacancies', vacanciesRouter);
app.use('/admin', adminAuthRouter);
app.use('/admin/vacancy', adminVacanciesRouter);
app.use('/admin/subscribers', subscribersRouter);
app.use('/admin/applicants', applicantsRouter);
app.use('/mail', mailRouter);
app.use('/apply', applyRouter);
app.use(errorHandler);


async function start() {
    try {
        console.log(chalk.yellow(`Connecting to DB: ${config.DB_NAME}`))
        await sequelize.sync();

        app.listen(config.PORT, () => {
            console.log(chalk.underline.bold.blue(`Server running at port: ${config.PORT}`));
        })
    } catch(e) {
        console.log(e);
    }
}

start();


