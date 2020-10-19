const {Router} = require('express');
const Subscriber = require('../models/subscriber');
const router = Router();
const sendSubscrbMail = require('../emails/subs-success');

router.get('/unsubscribe', async (req, res) => {
    console.log('unsub', req.query);
    const email = req.query.email;
    const candidate = await Subscriber.findOne({email});
    console.log(candidate);
    res.render('unsubscribe', {
        layout: 'empty',
        isSubscribed: !!candidate,
        email
    })
});

router.post('/unsubscribe', async (req, res) => {
    console.log('unsub', req.body.email);
    const email = req.body.email;
    const candidate = await Subscriber.findOne({email});
    console.log('candidate: ' ,candidate);
    let isUnsubscribed = {value: null};
    try {
        if (candidate) {
            await Subscriber.deleteOne({_id: candidate._id});
            isUnsubscribed.value = true;
        } else {
            isUnsubscribed.value = false;
        }
    console.log(isUnsubscribed);

        res.render('unsubscribe', {
            layout: 'empty',
            isUnsubscribed
        })
    } catch(err) {
        console.log(err);
    }
});


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
            sendSubscrbMail(email);
        }
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;
