const {Router} = require('express');
const router = Router();
const Admin = require('../../models/admin');
const bcrypt = require('bcryptjs');

router.get('/*', async (req, res) => {
    res.render('admin/admin-app', {
        layout: 'admin-app'
    })
});


router.post('/login', async (req, res) => {
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

module.exports = router;
