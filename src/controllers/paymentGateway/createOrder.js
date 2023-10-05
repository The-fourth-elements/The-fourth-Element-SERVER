const mercadopago = require("mercadopago");
require('dotenv').config();
const { URL } = process.env;

async function createOrder(req, res, next) {
    try {
        const response = await mercadopago.preferences.create({
            items:[
                {
                    title: "Curso",
                    unit_price: 100,
                    currency_id: "USD",
                    quantity: 1
                }
            ],
            back_urls: {
                success: `${URL}/paid-success`,
                failure: `${URL}/paid-success`,
                pending: `${URL}/paid-success`,
            },
            auto_return: "approved",
            notification_url: "https://a7a8-168-181-209-34.ngrok.io/webhook"
        });
        console.log(response.init_point);
        if (response) {
            res.status(200).json({ status: "Success", url: response.body.init_point, id: response.body.id });
        } else {
            throw Error("No se pudo crear un pedido.");
        }
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = createOrder;