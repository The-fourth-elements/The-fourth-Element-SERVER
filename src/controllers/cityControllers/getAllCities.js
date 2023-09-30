const City = require("../../models/City");

async function getAllCities(req, res){
    try {
        const cities = await City.find();
        if (!cities.length < 0) {
            res.status(200).json(cities)
        } else throw Error('Cities is empty.')
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = getAllCities;