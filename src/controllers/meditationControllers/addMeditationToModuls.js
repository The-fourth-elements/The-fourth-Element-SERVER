const Meditation = require('../../models/Meditation');
const Module = require('../../models/Module');

async function addMeditationToModuls (req, res, next){
    try {
        const { moduleId , meditationId } = req.params;
        if(!meditationId || !moduleId) throw Error('Ingrese un ID');
        const searchMeditation = await Meditation.findById(meditationId);
        if(!searchMeditation) throw Error(`No se pudo encontrar a la meditacion con ID: ${meditationId}`);
        const searchModule = await Module.findById(moduleId);
        if(!searchModule) throw Error(`No se pudo encontrar a la meditacion con ID: ${moduleId}`);
        searchModule.meditation.push(searchMeditation);
        await searchModule.save();
        return res.status(200).json({ message: 'Meditacion agregado al modulo con exito' });
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};

module.exports = addMeditationToModuls;