
async function feedback(req, res) {
	try {
		console.log({
			Payment: req.query.payment_id,
			Status: req.query.status,
			MerchantOrder: req.query.merchant_order_id
		});
		res.redirect(`${URL}/paid-success`);
	} catch (error) {
		return res.status(400).json({error: error.message})	
	}
}

module.exports = feedback;
