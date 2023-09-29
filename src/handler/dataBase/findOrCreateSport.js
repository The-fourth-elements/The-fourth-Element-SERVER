const SportMongoose = require('../../models/Sport');

async function findOrCreateSport(sport){
    try {
        const sportDB = await SportMongoose.findOne({ name: sport });
        if (sportDB) return sportDB;
        const newSport = await SportMongoose.create({ name: sport});
        if (newSport) return newSport;
        else throw Error("Error al intentar crear el deporte");
    } catch (error) {
        return {error: error.message};
    }
}

module.exports = findOrCreateSport;