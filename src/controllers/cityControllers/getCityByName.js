const City = require("../../models/City");

async function getCityByName(req, res) {
    const { name } = req.query;
    try {
        if (name) {
            const city = await City.findOne({name});
            if (city) {
                res.status(200).json(city);
            } else throw Error('Ciudad no encontrada');
        } else throw Error('Debe brindar un nombre');
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getCityByName;