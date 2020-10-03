const config = require('./config');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const chalk = require('chalk');
const path = require('path');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const hbsHelpers = require('./hbs-helpers/helpers');

const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const vacanciesRouter = require('./routes/vacancies');
const addVacancyRouter = require('./routes/add-vacancy');
const adminRouter = require('./routes/admin');

const varMiddleware = require('./middleware/variables');

const Admin = require('./models/admin');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: hbsHelpers
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

// app.use(async(req, res, next) => {
//     try {
//         const admin = await Admin.findById('5f78a8356b9fb505e62d756e');
//         req.admin = admin;
//         next();
//     } catch(e) {
//         console.log(e);
//     }
// })

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false
}));
app.use(varMiddleware);

app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/vacancies', vacanciesRouter);
app.use('/add', addVacancyRouter);
app.use('/admin', adminRouter)

async function start() {
    try {
        console.log(chalk.yellow(`Connecting to DB URL: ${config.DB_URL}`))
        await mongoose.connect(config.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });

        const candidate = await Admin.findOne();
        if(!candidate) {
            const admin = new Admin({
                login: 'admin',
                password: 'root'
            });
            await admin.save();
        }

        app.listen(PORT, () => {
            console.log(chalk.underline.bold.blue(`Server running at port: ${PORT}`));
        })
    } catch(e) {
        console.log(e);
    }
}

start();


