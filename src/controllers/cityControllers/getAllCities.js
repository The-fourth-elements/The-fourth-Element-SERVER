const City = require("../../models/City");

async function getAllCities(req, res, next){
    try {
        const cities = await City.find({});
        if (cities) {
            res.status(200).json(cities)
        } else throw Error('Ciudades esta vacio.')
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getAllCities;