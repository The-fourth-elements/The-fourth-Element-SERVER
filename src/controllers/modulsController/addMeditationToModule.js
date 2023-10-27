const Module = require("../../models/Module");
const Meditation = require("../../models/Meditation");
const customError = require("../../helper/customError");

async function addMeditationToModule(req, res, next) {
    const { moduleId, meditationId } = req.params;

    try {
        const foundModule = await Module.findById(moduleId);

        if (!foundModule) throw customError('Módulo no encontrado', 400)

        const foundMeditation = await Meditation.findById(meditationId)

        if (!foundMeditation) throw customError('Meditacion no encontrada', 400)

        if (foundModule.meditation.includes(meditationId)) {
            return res.status(200).json({ message: 'La meditacion ya había sido agregada al módulo anteriormente' })
        }

        foundModule.meditation.addToSet(meditationId)
        await foundModule.save()

        return res.status(200).json({ message: 'Meditacion agregada al módulo con éxito' });
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = addMeditationToModule;
