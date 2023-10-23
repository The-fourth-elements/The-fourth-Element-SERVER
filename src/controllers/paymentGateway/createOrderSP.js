require('dotenv').config();
const { Stripe } = require('stripe');
const { Users } = require('../../models/Users');
const { STRIPE_SECRET_KEY, BACK_URL } = process.env

const createOrderSP = async (request, response) => {
    try {
        const { priceId, userId } = request.body;
        if (!priceId) {
            throw Error('No se proporcionó el ID del producto');
        }


        const stripe = new Stripe(STRIPE_SECRET_KEY);

        const checkout = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                },
            ],
            success_url: `${BACK_URL}/feedback-sp?userId=${userId}`,
            cancel_url: `${BACK_URL}/stripe-cancel?userId=${userId}`,
        });

        const userFound = await Users.findById(userId);
        userFound.stripe_payment = checkout.id;
        await userFound.save()
        response.status(201).json({ url: checkout.url });
    } catch (error) {
        console.error(error.message);
        return response.status(400).json({ error: error.message });
    }
}

module.exports = createOrderSP;