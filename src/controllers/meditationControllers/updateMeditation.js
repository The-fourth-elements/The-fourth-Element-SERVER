const findOrCreateTracks = require("../../handler/modules/findOrCreateTracks");
const Meditation = require("../../models/Meditation");

async function updateMeditation(req, res, next){
    const { id } = req.params;
    const { meditation } = req.body;
    try {
        if (!id) throw Error('Debe ingresar un ID');
        if (meditation.tracks) {
            meditation.tracks = await findOrCreateTracks(meditation.tracks);
        }
        const findMeditation = await Meditation.findByIdAndUpdate(id, meditation, { new: true });
        if (!findMeditation) throw Error('No se pudo modificar la Meditación');
        else res.status(200).json(findMeditation);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = updateMeditation;