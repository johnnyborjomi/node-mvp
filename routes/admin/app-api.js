const {Router} = require('express');
const router = Router();
const Admin = require('../../models/admin');
const Vacancy = require('../../models/vacancy');
const Subscibers = require('../../models/subscriber');
const Applicant = require('../../models/applicant');

const bcrypt = require('bcryptjs');

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

router.get('/vacancies', async (req, res) => {
    const vacancies = await Vacancy.find();
    // const templData = JSON.parse(JSON.stringify(vacancies));
    const templData = [];
    vacancies.map(v => templData.push(v.toObject({getters: true})));
    res.send(
        JSON.stringify(templData.reverse())
    );
});

router.get('/subscribers', async (req, res) => {
    const subs = await Subscibers.find();
    const templData = [];
    subs.map(s => templData.push(s.toObject({getters: true})));
    console.log(templData)
    res.send(
        JSON.stringify(templData.reverse())
    );
});

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