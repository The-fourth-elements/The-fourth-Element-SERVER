require('dotenv').config();
const { validateToken, createToken } = require('../services/token');
const { Users } = require('../models/Users');
const { transporter, mailContent } = require('../services/nodemailer');
const { handlerForgotPass, handlerResetPass } = require('../handler/handleUserDB');
const { ENTRY, PORT } = process.env

//ruta para validar el token.
function requireAuthController(req,res, next){
    try {
        let token;
    if(req.cookies.jwt){
        token = req.cookies.jwt
    }else if(req.body.token){
        token = req.body.token;
    } else return res.status(400).json({access:false})
    
    if(token){
        const validate = validateToken(token)
        if(!validate?.error) return res.status(200).json({access:true})
        else return res.status(400).json({acess:false, expirate:validate.error})
    } 
     throw Error('token is invalid')
    } catch (error) {
        next({message: error.message, statusCode: 400})
    }
}

async function forgotPassword(req, res, next){
    const { email } = req.body;
    try {
        if(email){
            const userExist = await handlerForgotPass(Users, email);
            if (userExist) {
                const token = createToken(userExist._id);
                const link = `${ENTRY}:${PORT}/auth/reset-password/${token}`;
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
        next({message: error.message, statusCode: 400})
    }
};

async function resetPassword(req, res, next){
    const { token, password } = req.body;
    try {
        const response = handlerResetPass(Users, token, password);
        if (response) {
            res.status(200).send('Password Update');
        } else {
            throw new Error("Can't change the password, review data.");
        }
    } catch (error) {
        next({message: error.message, statusCode: 404})
    }
        
}


module.exports ={
    requireAuthController,
    forgotPassword,
    resetPassword,

}