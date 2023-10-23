const Tracks = require("../../models/Tracks");

async function getAllTracks(req, res, next){
    try {
        const findTracks = await Tracks.find();
        if(findTracks.length <= 0) throw Error('No hay tracks registrados');
        else res.status(200).json(findTracks);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getAllTracks;