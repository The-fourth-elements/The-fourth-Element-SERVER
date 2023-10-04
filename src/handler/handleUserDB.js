const { isEmail } = require('validator');
const { encrypt } = require('../services/crypt');
const { decriptToken } = require('../services/token');
const { Users } = require('../models/Users')

async function handlerForgotPass(email){
    try {
        const userEmail = await Users.findOne({email});
        if (!email || !isEmail(email)) {
            throw Error('No es un email valido');
        } else {
            if (userEmail) {
                return userEmail;
            } else {
                throw new Error("No existe una cuenta con este email.");
            }
        }
    } catch (error) {
        return { error: error.message }
    }
}

async function handlerResetPass(token, password){
    try {
        const userToken = decriptToken(token);
        const matchUser = await Users.findById(userToken.data);
        if (matchUser) {
            if (password) {
                const newPass = await encrypt(password);
                await matchUser.updateOne({password: newPass});
            }else {
                throw new Error('Not matching.');
            }
        } else {
            throw new Error ('No data found for the given ID.')
        }
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {
    handlerForgotPass,
    handlerResetPass
}