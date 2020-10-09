const {Router} = require('express');
const bcrypt = require('bcryptjs');
const router = Router();
const Admin = require('../../models/admin');
const authMW = require('../../middleware/admin-auth');

router.get('/', authMW, async (req, res) => {
    res.redirect('/admin/dashboard');
});

router.get('/dashboard', authMW, async (req, res) => {
    res.render('admin/dashboard', {
        layout: 'admin',
        title: 'Admin Dashboard'
    })
});

router.get('/login', async (req, res) => {
    if(!req.session.isAdminAuthenticated) {
        res.render('admin/login', {
            layout: 'admin',
            title: 'Admin Login',
            error: req.flash('loginError')
        })
    } else {
        res.redirect('/admin/dashboard');
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    })
})

router.post('/login', async (req, res) => {
    try {
        const {login, password} = req.body;                            
        const candidate = await Admin.findOne({login});
        if (candidate) {
            console.log('Login: ', candidate);
            const passChecked = await bcrypt.compare(password, candidate.password);
            if (passChecked) {
                req.session.admin = candidate;
                req.session.isAdminAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err;
                    } else {
                        res.redirect('/admin/dashboard');
                    }
                })
            } else {
                req.flash('loginError', 'Invalid Login or Password!')
                res.redirect('/admin/login');
            }
        } else {
            req.flash('loginError', 'Invalid Login or Password!')
            res.redirect('/admin/login');
        }
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;