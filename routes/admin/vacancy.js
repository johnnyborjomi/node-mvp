const {Router} = require('express');
const router = Router();
const Admin = require('../../models/admin');
const Vacancy = require('../../models/vacancy');
const authMW = require('../../middleware/admin-auth');
const sendNewVacancyMail = require('../../emails/new-vacancy');

router.get('/', authMW, async (req, res) => {
    const vacancies = await Vacancy.findAll();
    // const templData = JSON.parse(JSON.stringify(vacancies));
    const templData = [];
    vacancies.map(v => templData.push(v.dataValues));
    res.render('admin/vacancies', {
        layout: 'admin',
        title: 'Vacancies Page',
        isVacancies: true,
        vacancies: templData.reverse()
    });
})

router.get('/add', authMW, (req, res) => {
    try {
        res.render('admin/add-vacancy', {
            layout: 'admin',
            title: 'Add Vacancy',
            isAddVacancies: true
        });
    } catch(e) {
        console.log(e)
    }
})

router.get('/:id', authMW, async (req, res) => {

    const data = await (await Vacancy.findById(req.params.id)).toObject({getters: true});
    res.render('admin/vacancy', {
        layout: 'admin',
        data: data
    })
})

router.post('/add', authMW, async (req, res) => {
    console.log('new vacancy: ', req.body)
    try {
        const vacancy = new Vacancy({
            title: req.body.title,
            salary: req.body.salary,
            text: req.body.text,
            locations: req.body.locations,
            vacancyType: req.body.vacancyType,
        });
        // await vacancy.save();
        res.redirect('/admin/vacancy');

        // await sendNewVacancyMail(vacancy);
    } catch (e) {
        console.log(e);
    }
})

router.post('/edit', authMW, async (req, res) => {
    console.log('update: ', req.body);
    await Vacancy.findByIdAndUpdate(req.body.id, {...req.body, createDate: new Date().toJSON()});
    res.redirect('/admin/vacancy');
})

router.get('/:id/edit', authMW, async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/admin/vacancy');
    } else {
        const data = await (await Vacancy.findById(req.params.id)).toObject({getters: true});
        res.render('admin/edit-vacancy', {
            layout: 'admin',
            data: data
        })
    }
})

router.post('/delete', authMW, async (req, res) => {
    try {
        await Vacancy.deleteOne({_id: req.body.id});
    } catch (e) {
        console.log(e);
    }
   
    res.redirect('/admin/vacancy');
})

router.get('/:id/delete', authMW, async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/admin/vacancy');
    } else {
        const data = await (await Vacancy.findById(req.params.id)).toObject({getters: true});
        res.render('admin/delete-vacancy', {
            layout: 'admin',
            data: data
        })
    }
})

module.exports = router;
