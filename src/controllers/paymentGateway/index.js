const createOrderMP = require("./createOrderMP");
const feedbackMP = require("./feedbackMP");
const createOrderPP = require("./createOrderPP");
const feedbackPP = require("./feedbackPP");
const getPricesSP = require('./getPricesSP')
const createOrderSP = require('./createOrderSP')
const feedbackSP = require('./feedbackSP');
const cancelOrderStripe = require('./cancelOrderStripe');

module.exports = {
    createOrderMP,
    feedbackMP,
    createOrderPP,
    feedbackPP,
    getPricesSP,
    createOrderSP,
    feedbackSP,
    cancelOrderStripe
}