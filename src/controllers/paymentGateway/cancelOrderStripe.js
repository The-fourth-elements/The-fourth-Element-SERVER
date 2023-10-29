require('dotenv').config();
const { URL } = process.env;
const { Users } = require('../../models/Users');


const cancelOrderStripe = async (req, res, next) => {
    try {
        const { userId } = req.query;
        if(!userId) throw Error('Ingrese un ID');
        const userFound = await Users.findById(userId);
        if(!userFound) throw Error(`No se pudo encontrar al usuario con id: ${userId}`);
        userFound.stripe_payment = '';
        await userFound.save()
        return res.redirect(`${URL}/prices`);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = cancelOrderStripe