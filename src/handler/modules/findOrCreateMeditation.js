const Meditation = require("../../models/Meditation");
const findOrCreateTracks = require("./findOrCreateTracks");

const findOrCreateMeditation = async({ name, description, tracks } ) => {
    try {
        if (!name || !description || !tracks) throw Error('Faltan datos.')
        const newTracks = await findOrCreateTracks(tracks);
        if(newTracks?.error) throw Error(newTracks.error);
        const findMeditation = await Meditation.findOne({ name });
        if (findMeditation) return findMeditation;
        const newMeditation = await Meditation.create({ name, description, tracks: newTracks });
        if(!newMeditation) throw Error('No se pudo crear la Meditación.')
        else return newMeditation
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = findOrCreateMeditation;