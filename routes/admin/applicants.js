const {Router} = require('express');
const router = Router();
const authMW = require('../../middleware/admin-auth');
const Applicant = require('../../models/applicant');

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

module.exports = router;