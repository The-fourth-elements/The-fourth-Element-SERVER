require('dotenv').config();
const { validateToken, createToken, decriptToken } = require('../services/token');
const { Users } = require('../models/Users');
const { transporter, mailContent } = require('../services/nodemailer');
const { handlerForgotPass, handlerResetPass } = require('../handler/handleUserDB');
const { ENTRY, PORT } = process.env

//ruta para validar el token.
function requireAuthController(req,res){
    const token = req.cookies.jwt
    if(token){
        console.log(token)
        const validate = validateToken(token)
        if(!validate?.error) res.status(200).json({access:true})
        else res.status(400).json({acess:false, expirate:validate.error})
    } else{
        res.status(400).json({access:false})
    }
}

async function forgotPassword(req, res){
    const { email } = req.body;
    try {
        if(email){
            const userExist = await handlerForgotPass(Users, email);
            if (userExist) {
                const token = createToken(userExist._id);
                const link = `${ENTRY}:${PORT}/reset-password/${token}`;
                transporter.sendMail(mailContent(userExist.email, link), (error, info) => {
                    if (error) {
                        throw new Error('Error sending email');
                    } else {
                        res.status(200).json({successful: info.response});
                    }
                });
            };
        };
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

async function resetPassword(req, res){
    const { token, password } = req.body;
    try {
        const response = handlerResetPass(Users, token, password);
        if (response) {
            res.status(200).send('Password Update');
        } else {
            throw new Error("Can't change the password, review data.");
        }
    } catch (error) {
        res.status(404).json({Error: error.message})
    }
        
}

module.exports ={
    requireAuthController,
    forgotPassword,
    resetPassword,

}