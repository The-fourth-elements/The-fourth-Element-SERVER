const Class = require('../../models/Class');
const Meditation = require('../../models/Meditation');
const SelfRegister = require('../../models/SelfRegister');
const Module = require('../../models/Module');
const Exercise = require('../../models/Exercises');

const getAllCountContent = async (req, res) => {
    try {
        const numberClass = await Class.count();
        const numberMeditations = await Meditation.count();
        const numberSelfRegister = await SelfRegister.count();
        const numberModules = await Module.count();
        const numberExercises = await Exercise.count();
        const counts = [{ classes: numberClass }, { meditations: numberMeditations }, { selfRegister: numberSelfRegister }, { modules: numberModules }, { exercises: numberExercises }];

        for (let index = 0; index < counts.length; index++) {
            console.log(counts[index]);
        }


        return res.status(200).send(counts)
    } catch (error) {
        return res.status(500).send({ error: "server error", message: "No se pudo realizar el conteo del contenido" });
    }

}

module.exports = getAllCountContent;