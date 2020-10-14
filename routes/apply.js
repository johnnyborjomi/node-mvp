const {Router} = require('express');
const Applicant = require('../models/applicant');
const router = Router();

router.post('/', async (req, res) => {
    console.log('body:' ,req.body);
    try {
        const {fullName, email, cv, message, vacancyId} = req.body;
        const candidate = await Applicant.findOne({email});
        if(candidate) {
            req.flash('applyError', 'User with these email already applied.');
            res.redirect(`/vacancies/${vacancyId}`);
        } else {
            const applicant = new Applicant({
                fullName,
                email,
                cv,
                message,
                createDate: new Date().toJSON(),
                vacancyId
            });
            await applicant.save();

            req.flash('applySuccess', 'User with these email already applied.');
            res.redirect(`/vacancies/${vacancyId}`);
        }

    } catch(err) {
        console.log(err);
    }
})

module.exports = router;
