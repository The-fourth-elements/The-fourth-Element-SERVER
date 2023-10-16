require('dotenv').config();
const mercadopago = require("mercadopago");
const { BACK_URL } = process.env;

async function createOrder(req, res, next) {
    const { id } = req.query;
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
                "success": `${BACK_URL}/feedback?id=${id}`,
                "failure": `${BACK_URL}/feedback?id=${id}`,
                "pending": `${BACK_URL}/feedback?id=${id}`,
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