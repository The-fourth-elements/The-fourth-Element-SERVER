const { Users } = require('../../models/Users');

require('dotenv').config();
const { URL } = process.env;

async function feedbackMP(req, res) {
	const { id } = req.query;
	try {
		if (req.query.status === "approved") {
			await Users.findByIdAndUpdate(id, { role: 1 }, { new: true });
			res.redirect(`${URL}/paid-success`);
		} else {
			res.redirect(`${URL}/prices`);
		}
	} catch (error) {
		return res.status(400).json({error: error.message})	
	}
}

module.exports = feedbackMP;
