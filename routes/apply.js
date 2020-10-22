const {Router} = require('express');
const Applicant = require('../models/applicant');
const router = Router();

router.post('/', async (req, res) => {
    console.log('body:' ,req.body);
    try {
        const {fullName, email, message, vacancyId} = req.body;
        const candidate = await Applicant.findOne({email});
        if(candidate) {
            req.flash('applyError', 'User with these email already applied.');
            res.redirect(`/vacancies/${vacancyId}`);
        } else {
            const applicantObj = {
                fullName,
                email,
                message,
                createDate: new Date().toJSON(),
                vacancyId
            }
            console.log('file: ', req.file);
            if(req.file) {
                applicantObj.cv = req.file.path;
            }
            const applicant = new Applicant(applicantObj);
            await applicant.save();

            req.flash('applySuccess', 'User with these email already applied.');
            res.redirect(`/vacancies/${vacancyId}`);
        }

    } catch(err) {
        console.log(err);
    }
})

module.exports = router;
