const mercadopago = require("mercadopago");
require('dotenv').config();

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
                "success": `http://localhost:3001/feedback`,
                "failure": `http://localhost:3001/feedback`,
                "pending": `http://localhost:3001/feedback`
            },
            auto_return: "approved"
        });
        if (response) {
            res.status(201).json({ status: "Success", url: response.body.init_point, id: response.body.id });
        } else {
            throw Error("No se pudo crear un pedido.");
        }
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = createOrder;