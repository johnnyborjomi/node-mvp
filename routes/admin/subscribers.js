const {Router} = require('express');
const router = Router();
const authMW = require('../../middleware/admin-auth');
const Subscibers = require('../../models/subscriber');

router.get('/', authMW, async (req, res) => {
    const subs = await Subscibers.findAll();
    const templData = [];
    subs.map(s => templData.push(s.dataValues));
    res.render('admin/subscribers', {
        subscribers: templData,
        layout: 'admin'
    })
});

module.exports = router;