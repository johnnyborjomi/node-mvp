const {Router} = require('express');
const router = Router();
const Vacancy = require('../models/vacancy');

router.get('/', async (req, res) => {
    const vacancies = await Vacancy.find();
    // const templData = JSON.parse(JSON.stringify(vacancies));
    const templData = [];
    vacancies.map(v => templData.push(v.toObject({getters: true})));
    res.render('vacancies', {
        title: 'Vacancies Page',
        isVacancies: true,
        vacancies: templData
    });
})

router.get('/:id', async (req, res) => {

    const data = await (await Vacancy.findById(req.params.id)).toObject({getters: true});
    res.render('vacancy', {
        layout: 'single-page',
        data: data
    })
})

module.exports = router;