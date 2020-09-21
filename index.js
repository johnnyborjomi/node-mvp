const express = require('express');
const chalk = require('chalk');
const path = require('path');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})


app.listen(PORT, () => {
    console.log(chalk.underline.bold.blue(`Server running at port: ${PORT}`));
})