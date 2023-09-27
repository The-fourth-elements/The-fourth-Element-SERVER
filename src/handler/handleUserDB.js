const { isEmail } = require('validator');
const { encrypt } = require('../services/crypt');
const { decriptToken } = require('../services/token');
const { Users } = require('../models/Users')

async function handlerForgotPass(email){
    try {
        const userEmail = await Users.findOne({email: email});
        if (!email || !isEmail(email)) {
            throw Error('Not a valid Email');
        } else {
            if (userEmail) {
                return userEmail;
            } else {
                throw new Error("Didn't exist an account with this e-mail.");
            }
        }
    } catch (error) {
        return { error: error.message }
    }
}

async function handlerResetPass(token, password){
    try {
        const userToken = decriptToken(token);
        console.log( userToken);
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