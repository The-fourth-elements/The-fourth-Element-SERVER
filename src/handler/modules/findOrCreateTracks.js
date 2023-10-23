const Tracks = require("../../models/Tracks");

const findOrCreateTracks = async(tracks) => {
    try {
        if(tracks.length <= 0) throw Error('Faltan tracks');
        const newTracks = await Promise.all(tracks.map(async track => {
            const findTrack = await Tracks.findOne({public_id: track.public_id})
            if (findTrack) return findTrack
            else {
                const newTrack = await Tracks.create({ public_id: track.public_id, url: track.url});
                return newTrack;
            }
        }));
        if (newTracks.length <= 0) throw Error('No se pudieron agregar tracks')
        else return newTracks;
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = findOrCreateTracks;