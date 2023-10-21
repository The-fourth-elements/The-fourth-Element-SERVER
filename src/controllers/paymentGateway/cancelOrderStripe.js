require('dotenv').config();
const { URL } = process.env;
const { Users } = require('../../models/Users');


const cancelOrderStripe = async (request, response) => {
    try {
        const { userId } = request.query;
        const userFound = await Users.findById(userId);
        userFound.stripe_payment = '';
        await userFound.save()
        return response.redirect(`${URL}/prices`);
    } catch (error) {
        console.log(error)
    }


}

module.exports = cancelOrderStripe