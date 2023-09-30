const mercadopago = require("mercadopago");

async function createOrder(req, res, next) {
    try {
    
        const response = await mercadopago.preferences.create({
            items:[
                {
                    title: "Curso 1",
                    unit_price: 100,
                    currency_id: "USD",
                    quantity: 1
                }
            ],
            back_urls: {
                success: "http://localhost:3001/feedback",
                failure: "http://localhost:3001/feedback",
                pending: "http://localhost:3001/feedback",
            },
            auto_return: "approved"
            // notification_url: "https://02d4-168-181-209-34.ngrok.io/webhook"
        });

        if (response) {

            res.status(200).json({ status: "Success", url: response.body.init_point, id: response.body.id });
        } else {
            throw Error("No se pudo crear un pedido.");
        }
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = createOrder;