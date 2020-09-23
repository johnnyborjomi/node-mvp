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

router.post('/edit', async (req, res) => {
    await Vacancy.update(req.body);
    res.redirect('/vacancies');
})

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/');
    } else {
        const data = await Vacancy.getById(req.params.id);
        res.render('edit-vacancy', {
            data: data
        })
    }
})

router.post('/delete', async (req, res) => {
    await Vacancy.delete(req.body.id);
    res.redirect('/vacancies');
})

router.get('/:id/delete', async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/');
    } else {
        const data = await Vacancy.getById(req.params.id);
        res.render('delete-vacancy', {
            data: data
        })
    }
})

module.exports = router;