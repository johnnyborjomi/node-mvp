const {Router} = require('express');
const vacancy = require('../models/vacancy');
const router = Router();
const Vacancy = require('../models/vacancy');

router.get('/', async (req, res) => {
    try {
        const vacancies = await Vacancy.findAll();
        // const templData = JSON.parse(JSON.stringify(vacancies));
        const templData = [];
        vacancies.map(v => templData.push(v.get()));
        res.render('vacancies', {
            title: 'Vacancies Page',
            isVacancies: true,
            vacancies: templData.reverse()
        });
    } catch (err) {
        console.log(err);
    }
    
})

router.get('/:id', async (req, res) => {

    const data = await (await Vacancy.findByPk(+req.params.id));
    res.render('vacancy', {
        layout: 'single-page',
        data: data.get()
    })
})

module.exports = router;