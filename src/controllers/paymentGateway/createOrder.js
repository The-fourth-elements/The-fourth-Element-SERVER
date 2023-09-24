const mercadopago = require("mercadopago");

async function createOrder(req, res) {
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
            throw Error("Can't create an order.")
        }
    } catch (error) {
        return {error: error.message};
    }
}

module.exports = createOrder;