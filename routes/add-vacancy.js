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
    console.log(req.body.title)
    try {
        const vacancy = new Vacancy({
            title: req.body.title,
            salary: req.body.salary,
            text: req.body.text,
            createDate: new Date().toJSON()
        });
        await vacancy.save();
        res.redirect('/vacancies');

    } catch (e) {
        console.log(e);
    }
})

module.exports = router;