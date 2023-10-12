const mercadopago = require('mercadopago');

async function reciveWebhook(req, res, next) {
    try {
        const payment = req.query;

        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment["data.id"]);
            const response = data.body.status;
            if(response === "aproved"){
                res.status(200).send('Success.');
            } else if(response === "rejected"){
                throw Error("El pago fue rechazado.");
            }
        }
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = reciveWebhook;