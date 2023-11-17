const Module = require('../../models/Module');
const Exercises = require('../../models/Exercises');

async function addExercisesToModule(req, res, next){
    try {
        const { moduleId, exercisesId } = req.body;
        if(!exercisesId || !moduleId) throw Error('Ingrese un ID');
        const searchExercises = await Exercises.findById(exercisesId);
        if(!searchExercises) throw Error(`No se encontro el ejercicio con ID: ${exercisesId}`);
        const searchModule = await Module.findById(moduleId);
        if(!searchModule) throw Error(`No se encontro el modulo con ID: ${moduleId}`);
        searchModule.exercises.push(searchExercises);
        await searchModule.save();
        return res.status(200).json({ message: 'Ejercicio agregado al modulo con exito' });
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = addExercisesToModule;