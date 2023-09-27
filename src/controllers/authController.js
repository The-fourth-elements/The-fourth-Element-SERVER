require('dotenv').config();
const { createToken } = require('../services/token');
const { transporter, mailContent } = require('../services/nodemailer');
const { handlerForgotPass, handlerResetPass } = require('../handler/handleUserDB');
const { URL } = process.env;

async function forgotPassword(req, res, next){
    const { email } = req.body;
    try {
        if (email){
            const userExist = await handlerForgotPass(email);
            if (userExist) {
                const token = createToken(userExist._id);
                const link = `${URL}/auth/reset-password/${token}`;
                transporter.sendMail(mailContent(userExist.email, link),
                (error, info) => {
                    if (error) {
                        throw new Error('Error sending email');
                    } else {
                        res.status(200).json({successful: info.response});
                    }
                });
            };
        };
    } catch (error) {
        next({message: error.message, statusCode: 400})
    }
};

async function resetPassword(req, res, next){
    const { token, newPassword } = req.body;
    try {
        const response = handlerResetPass(token, newPassword);
        if (response) {
            res.status(200).json({message: 'Access true'});
        } else {
            throw new Error("Can't change the password, review data.");
        }
    } catch (error) {
        next({message: error.message, statusCode: 404})
    }
};

module.exports = {
    forgotPassword,
    resetPassword
}