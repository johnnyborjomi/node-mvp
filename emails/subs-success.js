const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: config.MAIL_SERVICE,
  auth: {
    user: config.MAIL_ACCOUNT,
    pass: config.MAIL_PASS 
  }
});

function sendMail(to) {
    const mailOptions = {
        from: 'vacancies.support@gmail.com',
        to: to,
        subject: 'Subscription confirmation.',
        text: 'You have succesfully subscribed to new vacancies!'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMail;