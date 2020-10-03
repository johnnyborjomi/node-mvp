const {Router} = require('express');
const router = Router();
const Admin = require('../../models/admin');

router.get('/dashboard', async (req, res) => {
    res.render('admin/dashboard', {
        layout: 'admin',
        title: 'Admin Dashboard'
    })
});

router.get('/login', async (req, res) => {
    res.render('admin/login', {
        layout: 'admin',
        title: 'Admin Login'
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    })
})

router.post('/login', async (req, res) => {
    const admin = await Admin.findById('5f78a8356b9fb505e62d756e');
    req.session.admin = admin;
    req.session.isAdminAuthenticated = true;
    req.session.save(err => {
        if(err) throw err;
        res.redirect('/admin/dashboard');
    })
})

module.exports = router;