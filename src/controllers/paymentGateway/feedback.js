
async function feedback(req, res) {
	console.log(req.query);
    res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
}

module.exports = feedback;