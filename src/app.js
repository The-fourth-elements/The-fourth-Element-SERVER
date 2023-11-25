require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const handlerError = require('./handler/handlerError');
const cookieParser = require('cookie-parser');
const mercadopago = require('mercadopago');
const { URL, MP_TOKEN } = process.env;
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const path = require("path")

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'The Fourth Element API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: "Sandbox server (uses test data)"
            },
            {
                url: 'https://the-fourth-element-server-production.up.railway.app',
                description: "Production server (uses live data)"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./utils/swagger/paths/*.yaml")}`]
}

mercadopago.configure({
	access_token: MP_TOKEN,
});

const server = express();
server.use(express.json());

server.use(morgan('dev'));
server.use(cookieParser());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `${URL}`)
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
server.use('/', routes);
server.use("/api-documentation", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
server.use(handlerError);

module.exports = server;
