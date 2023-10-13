const { Users } = require('../../models/Users');

require('dotenv').config();
const { URL } = process.env;

async function feedback(req, res) {
	console.log(req.cookies);
	console.log(req.headers);
	console.log(req.header);
	console.log(req.body);
	console.log(req.params);
	console.log(req.query);
	try {
		if (req.query.status === "approved") {
			const updateUser = await Users.findByIdAndUpdate(jsdklfsdjklfdsjfds, { role: 1 }, { new: true });
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
