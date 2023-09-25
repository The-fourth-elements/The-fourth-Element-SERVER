require('dotenv').config();
const nodemailer = require('nodemailer');
const { MAILER_EMAIL, MAILER_PASSWORD } = process.env

// Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: MAILER_EMAIL,
        pass: MAILER_PASSWORD
    },
    debug: true
});

// Email content
const mailContent = (email, link) => {
    return mailOptions = {
        from: MAILER_EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `This is an email to reset you're password. If you didn't request the password reset, please contact us by replying to this email. The restore link is only available for a couple of minutes. ${link}`
    }
}


module.exports = {
    transporter,
    mailContent
}