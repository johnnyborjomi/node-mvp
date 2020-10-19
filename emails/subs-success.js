const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: config.MAIL_SERVICE,
  auth: {
    user: config.MAIL_ACCOUNT,
    pass: config.MAIL_PASS 
  }
});

function sendSubscrbMail(email) {
    const mailOptions = {
        from: 'vacancies.support@gmail.com',
        to: email,
        subject: 'Subscription confirmation.',
        html: `
                <h1>Congrats!!!</h1>
                <p>You have succesfully subscribed to new vacancies with email: ${email}!</p>
                <a href="${config.BASE_URL}/mail/unsubscribe?email=${email}">Unsubscribe</a>
            `
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendSubscrbMail;