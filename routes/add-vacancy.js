const {Router} = require('express');
const Vacancy = require('../models/vacancy.js');

const router = Router();

router.get('/', (req, res) => {
    res.render('add-vacancy', {
        title: 'Add Vacancy',
        isAddVacancies: true
    });
})

router.post('/', async (req, res) => {
    console.log(req.body);

    const vacancy = new Vacancy(req.body.vacancy_title, req.body.salary_range, req.body.vacancy_text);
    await vacancy.save();

    res.redirect('/vacancies');
})

module.exports = router;