const {Router} = require('express');
const router = Router();

router.get('/*', async (req, res) => {
    res.render('admin/admin-app', {
        layout: 'admin-app'
    })
});

module.exports = router;
