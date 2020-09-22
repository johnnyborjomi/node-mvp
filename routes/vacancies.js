const {Router} = require('express');
const router = Router();
const Vacancy = require('../models/vacancy');

router.get('/', async (req, res) => {
    const vacancies = await Vacancy.getAll();
    res.render('vacancies', {
        title: 'Vacancies Page',
        isVacancies: true,
        vacancies: vacancies
    });
})

router.get('/:id', async (req, res) => {

    const data = await Vacancy.getById(req.params.id);
    res.render('vacancy', {
        layout: 'single-page',
        data: data
    })
})

module.exports = router;