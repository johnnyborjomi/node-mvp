const {Router} = require('express');
const router = Router();
const Admin = require('../../models/admin');
const Vacancy = require('../../models/vacancy');
const Subscibers = require('../../models/subscriber');
const Applicant = require('../../models/applicant');
const sendNewVacancyMail = require('../../emails/new-vacancy');

const bcrypt = require('bcryptjs');

///auth

router.get('/auth/check', async (req, res) => {
    console.log(req.session);
    if(req.session.isAdminAuthenticated) {
        res.send(JSON.stringify({
            isLoggedIn: true,
        }));
    } else {
        res.send(JSON.stringify({
            isLoggedIn: false,
        }));
    }
});

router.get('/auth/logout', async (req, res) => {
    try {
        req.session.destroy(() => {
            res.send(JSON.stringify({
                isLoggedOut: true,
            }));
        })
    } catch (err) {
        console.log(err);
    }
});

router.post('/auth/login', async (req, res) => {
    try {
        const {login, password} = req.body;                            
        const candidate = await Admin.findOne({login});
        if (candidate) {
            const passChecked = await bcrypt.compare(password, candidate.password);
            if (passChecked) {
                req.session.admin = candidate;
                req.session.isAdminAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(JSON.stringify({
                            login: 'success',
                            message: 'Valid Login'
                        }));
                    }
                })
            } else {
                res.send(JSON.stringify({
                    login: 'failed',
                    message: 'Invalid Password'
                }));
            }
        } else {
            res.send(JSON.stringify({
                login: 'failed',
                message: 'Invalid Login'
            }));
        }
    } catch(err) {
        console.log(err);
    }
})

///vacancies

router.get('/vacancies', async (req, res) => {
    const vacancies = await Vacancy.find();
    const templData = [];
    vacancies.map(v => templData.push(v.toObject({getters: true})));
    res.send(
        JSON.stringify(templData.reverse())
    );
});

router.get('/vacancy/:id', async (req, res) => {
    try {
        const data = await (await Vacancy.findById(req.params.id)).toObject({getters: true});
        res.send(
            JSON.stringify(data)
        );
    } catch(err) {
        console.log(err);
        res.status(404).send(
            JSON.stringify({error: true, message: 'Vacancy not found'})
        )
    } 
})

router.post('/vacancy/edit', async (req, res) => {
    try {
        console.log('update: ', req.body);
        const vacancy = await Vacancy.findByIdAndUpdate(req.body.id, {...req.body, createDate: new Date().toJSON()});
        res.send(JSON.stringify({
            success: true,
            vacancyId: vacancy.id
        }));
    } catch(e) {
        console.log(e);
        res.status(404).send(JSON.stringify({
            success: false,
            message: e.message
        }));
    }
    
})

router.post('/vacancy/add', async (req, res) => {
    console.log('new vacancy: ', req.body)
    try {
        const data = req.body;
        const vacancy = new Vacancy({
            title: data.title,
            salary: data.salary,
            text: data.text,
            locations: data.locations,
            vacancyType: data.vacancyType,
            published: data.published,
            createDate: new Date().toJSON()
        });
        await vacancy.save();
        res.send(JSON.stringify({
            success: true,
            vacancyId: vacancy.id
        }));

        // await sendNewVacancyMail(vacancy);
    } catch (e) {
        console.log(e);
        res.status(404).send(JSON.stringify({
            success: false,
            message: e.message
        }));
    }
})

router.post('/vacancy/delete', async (req, res) => {
    try {
        await Vacancy.deleteOne({_id: req.body.id});
        res.send(
            JSON.stringify({deleted: 'success', message: 'Successfully deleted'})
        )
    } catch (e) {
        console.log(e);
        res.send(
            JSON.stringify({deleted: 'error', message: 'Something went wrong'})
        )
    }
});

///subs

router.get('/subscribers', async (req, res) => {
    const subs = await Subscibers.find();
    const templData = [];
    subs.map(s => templData.push(s.toObject({getters: true})));
    console.log(templData)
    res.send(
        JSON.stringify(templData.reverse())
    );
});

///applicants

router.get('/applicants', async (req, res) => {
    const subs = await Applicant.find()
        .populate('vacancyId');
    const templData = [];
    subs.map(s => templData.push(s.toObject({getters: true})));
    console.log(templData)
    res.send(
        JSON.stringify(templData.reverse())
    );
});

module.exports = router;