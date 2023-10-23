require('dotenv').config();
const { STRIPE_SECRET_KEY } = process.env
const { Stripe } = require('stripe')

const getPricesSP = async (req, res, next) => {
    try {
        const stripe = new Stripe(STRIPE_SECRET_KEY);
        const prices = await stripe.prices.list();
        return res.status(200).json({ prices: prices.data });
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getPricesSP;