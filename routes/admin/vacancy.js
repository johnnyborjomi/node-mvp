const {Router} = require('express');
const router = Router();
const Admin = require('../../models/admin');
const Vacancy = require('../../models/vacancy');
const authMW = require('../../middleware/admin-auth');
const sendNewVacancyMail = require('../../emails/new-vacancy');

router.get('/', authMW, async (req, res) => {
    const vacancies = await Vacancy.findAll();
    const templData = [];
    vacancies.map(v => templData.push(v.get()));
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
    try {
        const dbdata = await (await Vacancy.findByPk(req.params.id));
        const data = dbdata.get();
        if(!data) return res.redirect('/admin/vacancy');
        res.render('admin/vacancy', {
            layout: 'admin',
            data: data
        })
    } catch(err) {
        console.log(err);
    }
})

router.post('/add', authMW, async (req, res) => {
    // console.log('new vacancy: ', req.body) 
    try {
        const vacancy = await Vacancy.create({
            title: req.body.title,
            salary: req.body.salary,
            text: req.body.text,
            locations: req.body.locations,
            vacancyType: req.body.vacancyType,
        });
        res.redirect('/admin/vacancy');

        await sendNewVacancyMail(vacancy.get());
    } catch (e) {
        console.log(e);
    }
})

router.post('/edit', authMW, async (req, res) => {
    try {
        console.log('update: ', req.body);
        let item = await Vacancy.findByPk(req.body.id)
        // , {...req.body, createDate: new Date().toJSON()});
        await item.update({...item, ...req.body});

        res.redirect('/admin/vacancy');
    } catch(e) {
        console.log(e);
    }
    
})

router.get('/:id/edit', authMW, async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/admin/vacancy');
    } else {
        const data = await (await Vacancy.findByPk(req.params.id));
        res.render('admin/edit-vacancy', {
            layout: 'admin',
            data: data.get()
        })
    }
})

router.post('/delete', authMW, async (req, res) => {
    try {
        await Vacancy.destroy({ where: { id: req.body.id } });
    } catch (e) {
        console.log(e);
    }
   
    res.redirect('/admin/vacancy');
})

router.get('/:id/delete', authMW, async (req, res) => {
    if(!req.query.allow) {
        res.redirect('/admin/vacancy');
    } else {
        const dbdata = await (await Vacancy.findByPk(req.params.id));
        const data = dbdata.get();
        res.render('admin/delete-vacancy', {
            layout: 'admin',
            data: data
        })
    }
})

module.exports = router;
