const Meditation = require("../../models/Meditation");

async function getMeditationById(req, res, next){
    const { id } = req.params;
    try {
        const findMeditation = await Meditation.findById(id).populate('tracks');
        if(!findMeditation) throw Error('No se encontró la meditación');
        else res.status(200).json(findMeditation);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = getMeditationById;