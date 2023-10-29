const Tracks = require("../../models/Tracks");

async function getTrackById(req, res, next){
    const { id } = req.params;
    try {
        if (!id) throw Error('Deve ingresar un id.');
        const findTrack = await Tracks.findById(id);
        if(!findTrack) throw Error('No se encontro el Track.');
        else res.status(200).json(findTrack);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getTrackById;