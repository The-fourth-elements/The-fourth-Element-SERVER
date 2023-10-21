require('dotenv').config();
const { URL, STRIPE_SECRET_KEY } = process.env;
const { Stripe } = require('stripe');
const { Users } = require('../../models/Users');
const { payment } = require('mercadopago');

const feedbackSP = async (request, response) => {
    try {
        const { userId } = request.query;
        const stripe = new Stripe(STRIPE_SECRET_KEY);
        const user = await Users.findById(userId);
        const cs = await stripe.checkout.sessions.retrieve(user.stripe_payment);


        if (cs.payment_status === 'paid') {
            user.stripe_payment = 0
            user.role = 1;
            await user.save();
            return response.redirect(`${URL}/paid-success`)
        }

        throw new Error('No se ha pagado el curso aun')


    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
}

module.exports = feedbackSP