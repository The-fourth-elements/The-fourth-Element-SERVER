const Nation = require('../../models/Nation');

async function findOrCreateNation(country) {
    try {
        const countries = await Nation.findOne({name: country})
        if (countries) return countries;
        const newCountry = await Nation.create({name: country});
        if (newCountry) return newCountry;
        throw Error('Error found creating Country DB.');
    } catch (error) {
        return error;
    }
}

module.exports = findOrCreateNation;