const Nation = require("../../models/Nation");

async function getCountryByName(req, res) {
    const { name } = req.query; 
    try {
        if (name) {
            const country = await Nation.findOne({name});
            if (country) {
                res.status(200).json(country);
            } else throw Error('Pais no encontrado');
        } else throw Error('Debe brindar un nombre');
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = getCountryByName;