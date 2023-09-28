const Nation = require("../../models/Nation");

async function getCountryById(req, res){
    const { id } = req.params;
    try {
        const country = await Nation.findById(id);
        if (country) {
            res.status(200).json(country);
        } else throw Error('Country not found.');
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getCountryById;