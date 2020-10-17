const {Router} = require('express');
const Subscriber = require('../models/subscriber');
const router = Router();
const sendMail = require('../emails/subs-success');


router.post('/subscribe', async (req, res) => {
    console.log('body:' ,req.body);
    try {
        const {email} = req.body;
        const candidate = await Subscriber.findOne({email});
        if(candidate) {
            res.status(200).json({
                subscribed: false,
                message: 'User with these email already subscribed!'
            })
        } else {
            const subscriber = new Subscriber({
                email,
                createDate: new Date().toJSON()
            });
            await subscriber.save();
            res.status(200).json({
                subscribed: true,
                message: 'Subscribed Succesfully!' 
            });
            sendMail(email);
        }
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;
