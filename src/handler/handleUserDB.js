const { isEmail } = require('validator');
const { encrypt } = require('../services/crypt');
const { decriptToken } = require('../services/token');

async function handleUserDB (Users, id){
    try {
        const foundUser = await Users.findOne({"_id": id});
        if (foundUser) return foundUser;
        else throw Error('User not found.')
    } catch (error) {
        return { error: error.message }
    }
}

async function handleAllUserDB(Users){
    try {
        const allUsers = await Users.find({});
        if(Array.isArray(allUsers) && allUsers.length) return allUsers;
        throw Error('Users is empty');
    } catch (error) {
        return { error: error.message }
    }
}

async function handlerForgotPass(Users, email){
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

async function handlerResetPass(Users, token, password){
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
    handleUserDB,
    handleAllUserDB,
    handlerForgotPass,
    handlerResetPass
}