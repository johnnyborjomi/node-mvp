const {Router} = require('express');
const router = Router();
const authMW = require('../../middleware/admin-auth');
const Applicant = require('../../models/applicant');

router.get('/', authMW, async (req, res) => {
    const subs = await Applicant.findAll();
    const templData = [];
    subs.map(s => templData.push(s.toObject({getters: true})));
    console.log(templData)
    res.render('admin/applicants', {
        applicants: templData,
        layout: 'admin'
    })
});

router.post('/delete', authMW, async (req, res) => {
    try {
        await Applicant.deleteOne({_id: req.body.id});
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
            const data = await (await Applicant.findById(req.params.id)).toObject({getters: true});
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