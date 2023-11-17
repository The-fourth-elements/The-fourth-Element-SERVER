const Class = require('../../models/Class');
const Meditation = require('../../models/Meditation');
const SelfRegister = require('../../models/SelfRegister');
const Module = require('../../models/Module');
const Exercise = require('../../models/Exercises');

const getAllCountContent = async (req, res) => {
    try {
        const numberModules = await Module.countDocuments();
        const numberClass = await Class.countDocuments();
        const numberExercises = await Exercise.countDocuments();
        const numberMeditations = await Meditation.countDocuments();
        const numberSelfRegister = await SelfRegister.countDocuments();
        const counter = {
            modules: numberModules,
            classes: numberClass,
            exercises: numberExercises,
            meditations: numberMeditations,
            charlas: 47,
            selfRegisters: numberSelfRegister
        }
        return res.status(200).json(counter)
    } catch (error) {
        return res.status(500).json({ error: "server error", message: "No se pudo realizar el conteo del contenido" });
    }

}

module.exports = getAllCountContent;