const Meditation = require("../../models/Meditation");

async function getAllMeditations(req, res, next){
    try {
        const meditations = await Meditation.find().populate('tracks');
        if(meditations.length <= 0) throw Error('No hay meditaciones registradas.');
        else res.status(200).json(meditations);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = getAllMeditations;