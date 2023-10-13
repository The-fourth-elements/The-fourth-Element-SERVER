const { Users } = require('../../models/Users');

require('dotenv').config();
const { URL } = process.env;

async function feedback(req, res) {
	const { id } = req.query;
	console.log("Id", id);
	console.log("Query", req.query);
	try {
		if (req.query.status === "approved") {
			const updateUser = await Users.findByIdAndUpdate(id, { role: 1 }, { new: true });
			console.log(updateUser);
			res.redirect(`${URL}/paid-success`);
		} else {
			res.redirect(`${URL}/prices`);
		}
	} catch (error) {
		return res.status(400).json({error: error.message})	
	}
}

module.exports = feedback;
