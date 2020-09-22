const express = require('express');
const chalk = require('chalk');
const path = require('path');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const hbsHelpers = require('./hbs-helpers/helpers');

const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const vacanciesRouter = require('./routes/vacancies');
const addVacancyRouter = require('./routes/add-vacancy');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: hbsHelpers
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/vacancies', vacanciesRouter);
app.use('/add', addVacancyRouter);



app.listen(PORT, () => {
    console.log(chalk.underline.bold.blue(`Server running at port: ${PORT}`));
})