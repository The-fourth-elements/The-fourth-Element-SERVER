require('dotenv').config();
const paypal = require('@paypal/checkout-server-sdk');
const { ID_CLIENT, CLIENT_SECRET } = process.env;

const environment = new paypal.core.SandboxEnvironment(ID_CLIENT, CLIENT_SECRET);

const client = new paypal.core.PayPalHttpClient(environment);

const createOrderPP = async (req, res, next) => {
    const { userID } = req.body;
    try {
        const order = new paypal.orders.OrdersCreateRequest();
        order.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100.00"
                    },
                    description: "Curso de Estanislao Bachrach"
                }
            ]
        })
        responseOrder = await client.execute(order);
        return res.status(200).json({ id: responseOrder.result.id });
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
    
}

module.exports = createOrderPP;