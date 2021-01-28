const {body} = require('express-validator');
const Subscriber = require('../models/subscriber');

exports.subscribeValidators = [
    body('email').isEmail()
        .withMessage('Invalid Email adress.').custom( async (value, {req}) => {
            try {
                const subscriber = await Subscriber.findOne({email: value});
                if (subscriber) {
                    return Promise.reject('User with these email already subscribed!');
                }
            } catch(e) {
                console.log(e);
            }
        })
        .normalizeEmail()
]