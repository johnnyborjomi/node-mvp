const {Router, json} = require('express');
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

router.post('/edit', async (req, res) => {
    await Vacancy.findByIdAndUpdate(req.body.id, req.body);
    res.redirect('/vacancies');
})

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/');
    } else {
        const data = await (await Vacancy.findById(req.params.id)).toObject({getters: true});
        res.render('edit-vacancy', {
            data: data
        })
    }
})

router.post('/delete', async (req, res) => {
    try {
        await Vacancy.deleteOne({_id: req.body.id});
    } catch (e) {
        console.log(e);
    }
   
    res.redirect('/vacancies');
})

router.get('/:id/delete', async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/');
    } else {
        const data = await (await Vacancy.findById(req.params.id)).toObject({getters: true});
        res.render('delete-vacancy', {
            data: data
        })
    }
})

module.exports = router;