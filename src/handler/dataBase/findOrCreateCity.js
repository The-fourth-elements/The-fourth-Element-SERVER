const CityMongoose = require("../../models/City");

async function findOrCreateCity(city) {
    try {
        const cityDB = await CityMongoose.findOne({ name: city });
        if (cityDB) return cityDB;
        const newCity = await CityMongoose.create({ name: city });
        if (newCity) return newCity;
        throw Error("Error found creating City DB.");
    } catch (error) {
        return error;
    }
};

module.exports = findOrCreateCity;