const Nation = require("../../models/Nation")

async function getAllCountries(req, res){
    try {
        const countries = await Nation.find({});
        if (countries) {
            res.status(200).json(countries);
        } else throw Error('Countries is empty.');
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getAllCountries;