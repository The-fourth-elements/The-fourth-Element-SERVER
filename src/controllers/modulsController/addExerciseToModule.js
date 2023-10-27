const Module = require("../../models/Module");
const Exercise = require("../../models/Exercises");

async function addExerciseToModule(req, res, next) {
    const { moduleId, exerciseId } = req.params;

    try {
        const foundModule = await Module.findById(moduleId);

        if (!foundModule) throw customError('Módulo no encontrado', 400)

        const foundExercise = await Exercise.findById(exerciseId);

        if (!foundExercise) throw customError('Ejercicio no encontrado', 400)

        if (foundModule.exercises.includes(exerciseId)) {
            return res.status(200).json({ message: 'El ejercicio ya había sido agregado al módulo anteriormente' })
        }
        
        foundModule.exercises.addToSet(exerciseId)
        await foundModule.save()

        return res.status(200).json({ message: 'Ejercicio agregado al módulo con éxito' })
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = addExerciseToModule;
