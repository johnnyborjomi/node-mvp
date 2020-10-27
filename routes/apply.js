const {Router} = require('express');
const Applicant = require('../models/applicant');
const router = Router();
const fs = require('fs');
const path = require('path');
const file = require('../middleware/file');

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
            if(req.file) {
                applicantObj.cv = {
                    name: req.fileUuidName,
                    file: {
                        data: fs.readFileSync(path.resolve(__dirname, '../cv', req.fileUuidName)),
                        contentType: req.file.mimetype
                    }
                }
            }
            console.log(applicantObj);
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
