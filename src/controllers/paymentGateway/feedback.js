const { Users } = require('../../models/Users');

require('dotenv').config();
const { URL } = process.env;

async function feedback(req, res) {
	const { jsdklfsdjklfdsjfds } = req.cookies;
	try {
		if (req.query.status === "approved") {
			await Users.findByIdAndUpdate(jsdklfsdjklfdsjfds, { role: 1 })
			res.redirect(`${URL}/paid-success`);
		} else {
			res.redirect(`${URL}/prices`);
		}
	} catch (error) {
		return res.status(400).json({error: error.message})	
	}
}

module.exports = feedback;
