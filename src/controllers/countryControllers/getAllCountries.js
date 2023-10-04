const Nation = require("../../models/Nation")

async function getAllCountries(req, res, next){
    try {
        const countries = await Nation.find({});
        if (countries.length) {
            res.status(200).json(countries);
        } else throw Error('Paises esta vacio.');
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = getAllCountries;