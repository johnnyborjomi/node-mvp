const {Router} = require('express');
const router = Router();
const authMW = require('../../middleware/admin-auth');
const Applicant = require('../../models/applicant');
const fs = require('fs');
const path = require('path');

router.get('/', authMW, async (req, res) => {
    const subs = await Applicant.find()
        .populate('vacancyId');
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
        const candidate = await Applicant.findById(req.body.id);
        if(candidate) {
            const filePath = path.resolve(__dirname, '../../cv', candidate.cv.name);
            console.log(filePath);
            fs.unlink(filePath, async err => {
                if (err) throw err;
                await Applicant.deleteOne({_id: req.body.id});
            });
        }else{
            res.redirect('admin/applicants');
        }
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