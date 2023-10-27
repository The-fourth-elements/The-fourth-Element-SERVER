const Exercises = require("../../models/Exercises");
const Module = require("../../models/Module");

async function addExerciseToModule(req, res, next){
    const { moduleId, exerciseId } = req.params;
    try {
        const findModule = await Module.findById(moduleId);
        if(!findModule) throw Error('No se encontró el módulo.');

        const findExercise = await Exercises.findById(exerciseId);
        if(!findExercise) throw Error('No se encontró el ejercicio.');

        findModule.exercises.push(exerciseId);
        findModule.save();

        return res.status(200).json({ message: 'Ejercicio agregado al módulo con éxito' })
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = addExerciseToModule;