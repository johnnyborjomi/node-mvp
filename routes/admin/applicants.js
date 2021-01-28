const {Router} = require('express');
const router = Router();
const authMW = require('../../middleware/admin-auth');
const Applicant = require('../../models/applicant');
const Vacancy = require('../../models/vacancy');

router.get('/', authMW, async (req, res) => {
    const subs = await Applicant.findAll({ include: [ { model: Vacancy, as: 'Vacancy' } ] });
    const templData = [];
    subs.map(s => templData.push(s.get()));
    console.log(templData[0].Vacancy.dataValues)
    res.render('admin/applicants', {
        applicants: templData,
        layout: 'admin'
    })
});

router.post('/delete', authMW, async (req, res) => {
    try {
        await Applicant.destroy({where: {id: req.body.id}});
    } catch (e) {
        console.log(e);
    }
   
    res.redirect('/admin/applicants');
})

router.get('/:id/delete', authMW, async (req, res) => {
    try {
        if(!req.query.allow) {
            res.redirect('/admin/applicants');
        } else {
            console.log('params: ', req.params);
            const data = await (await Applicant.findByPk(req.params.id));
            res.render('admin/delete-applicant', {
                layout: 'admin',
                data: data
            })
        }
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;