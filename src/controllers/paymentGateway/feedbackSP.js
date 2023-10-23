require('dotenv').config();
const { URL, STRIPE_SECRET_KEY } = process.env;
const { Stripe } = require('stripe');
const { Users } = require('../../models/Users');
const { payment } = require('mercadopago');

const feedbackSP = async (req, res, next) => {
    try {
        const { userId } = req.query;
        if(!userId) throw Error('Ingrese in ID');
        const stripe = new Stripe(STRIPE_SECRET_KEY);
        const user = await Users.findById(userId);
        if(!user) throw Error(`No se pudo encontrar el usuario con id: ${userId}`);
        const cs = await stripe.checkout.sessions.retrieve(user.stripe_payment);
        if(!cs) throw Error('Eror al encontrar la orden');

        if (cs.payment_status === 'paid') {
            user.stripe_payment = 0
            user.role = 1;
            await user.save();
            return res.redirect(`${URL}/paid-success`)
        }

        throw new Error('No se ha pagado el curso aun');


    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = feedbackSP;