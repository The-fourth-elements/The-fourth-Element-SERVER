require('dotenv').config();
const { URL, STRIPE_SECRET_KEY } = process.env;
const { Stripe } = require('stripe');
const { Users } = require('../../models/Users');

const feedbackSP = async (request, response) => {
    try {
        const { userId } = request.query;
        // if (!userId) throw Error('No se encontro el id del usuario');
        //logica para cambiar el usuario por id
        const stripe = new Stripe(STRIPE_SECRET_KEY);

        const userFound = await Users.findByIdAndUpdate(userId, { role: 1 }, { new: true });
        // const k = await stripe.checkout.sessions.retrieve(userFound.stripe_payment);
        // console.log(k, 'soy el cargo')
        if (userFound.stripe_payment) {
            //logica para cambiar el usuario
            console.log(userFound);
            console.log('he entrado aqui pendejo');
        }

        console.log(request.query);
        response.redirect(`${URL}/paid-success`)
        // return response.status(200).json({ 'message': 'holis' })

    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
}

module.exports = feedbackSP