const mercadopago = require('mercadopago');
const Users = require('../../models/Users');

async function reciveWebhook(req, res) {
    try {
        const payment = req.query;

        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment["data.id"]);
            const response = data.body.status;
            if(response === "aproved"){
                res.status(200).send('Success.');
            } else if(response === "rejected"){
                throw Error("Te payment was rejected.");
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = reciveWebhook;