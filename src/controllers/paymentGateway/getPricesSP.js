require('dotenv').config();
const { Stripe } = require('stripe')

const getPricesSP = async (request, response, next) => {
    try {

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const prices = await stripe.prices.list()
        return response.status(200).json({ prices: prices.data });
    } catch (error) {
        console.log('ocurrio un error en la obtencion de precio, Aqui el error ===>', error);
    }
}

module.exports = getPricesSP;