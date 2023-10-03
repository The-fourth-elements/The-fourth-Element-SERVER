require('dotenv').config();
const { handlerForgotPass } = require("../../handler/handleUserDB");
const Invite = require("../../models/Invite");
const { mailInvite, transporter } = require("../../services/nodemailer");
const { URL } = process.env;

async function inviteUser(req, res, next){
    const { email } = req.body;
    try {
        if (email){
            const userExist = await handlerForgotPass(email);
            if (!userExist?.error) {
                userExist.role = 1;
                userExist.save();
                res.status(200).json({message: "El usuario ya es invitado", user: userExist});
            } else {
                await Invite.create({email});
                const link = `${URL}/auth`;
                transporter.sendMail(mailInvite(email, link),
                (error, info) => {
                    if (error) {
                        throw new Error('Error al enviar el email');
                    } else {
                        res.status(200).json({successful: info.response});
                    }
                });
            }
        } else throw Error('Debe ingresar un email');
    } catch (error) {
        next({ message: error.message, statusCode: 400 })
    }
};

module.exports = inviteUser;