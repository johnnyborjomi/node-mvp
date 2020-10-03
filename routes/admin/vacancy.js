const {Router} = require('express');
const router = Router();
const Admin = require('../../models/admin');
const Vacancy = require('../../models/vacancy');

router.get('/', async (req, res) => {
    const vacancies = await Vacancy.find();
    // const templData = JSON.parse(JSON.stringify(vacancies));
    const templData = [];
    vacancies.map(v => templData.push(v.toObject({getters: true})));
    res.render('admin/vacancies', {
        layout: 'admin',
        title: 'Vacancies Page',
        isVacancies: true,
        vacancies: templData
    });
})

// router.get('/:id', async (req, res) => {

//     const data = await (await Vacancy.findById(req.params.id)).toObject({getters: true});
//     res.render('admin/vacancy', {
//         layout: 'admin',
//         data: data
//     })
// })

router.get('/add', (req, res) => {
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

router.post('/add', async (req, res) => {
    console.log(req.body.title)
    try {
        const vacancy = new Vacancy({
            title: req.body.title,
            salary: req.body.salary,
            text: req.body.text,
            createDate: new Date().toJSON()
        });
        await vacancy.save();
        res.redirect('/admin/vacancy');

    } catch (e) {
        console.log(e);
    }
})

router.post('/edit', async (req, res) => {
    await Vacancy.findByIdAndUpdate(req.body.id, req.body);
    res.redirect('/admin/vacancy');
})

router.get('/:id/edit', async (req, res) => {
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

router.post('/delete', async (req, res) => {
    try {
        await Vacancy.deleteOne({_id: req.body.id});
    } catch (e) {
        console.log(e);
    }
   
    res.redirect('/admin/vacancy');
})

router.get('/:id/delete', async (req, res) => {
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
