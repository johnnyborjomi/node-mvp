const nodemailer = require('nodemailer');
const config = require('../config');
const Subscriber = require('../models/subscriber');

const transporter = nodemailer.createTransport({
  service: config.MAIL_SERVICE,
  auth: {
    user: config.MAIL_ACCOUNT,
    pass: config.MAIL_PASS 
  }
});

async function sendNewVacancyEmail(vacancyData) {

    function mailOptions (mailTo) {
        return {
            from: 'vacancies.support@gmail.com',
            to: mailTo,
            subject: 'Check our new vacancy.',
            html: `
                    <h1>New vacancy Added!!!</h1>
                    <p><b>Title</b>: ${vacancyData.title}</p>
                    <p><b>Text</b>: ${vacancyData.text}</p>
                    <a href="${config.BASE_URL}/vacancies/${vacancyData._id}">View new vacancy here.</a>
                `
        };
    };

    const subscribers = await Subscriber.find();
    const emailToArr = subscribers.map(sub => sub.email);
    console.log('email to array: ', emailToArr);

    emailToArr.forEach(emailTo => {
        transporter.sendMail(mailOptions(emailTo), function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })
}

module.exports = sendNewVacancyEmail;