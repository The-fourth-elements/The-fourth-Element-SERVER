const Exercises = require("../../models/Exercises");

const findOrCreateExercise = async(name, description, questions) => {
    try {
        const findExercise = await Exercises.findOne({name});
        if(findExercise) return findExercise;
        const createExercise = await Exercises.create({name, description, questions});
        if (!createExercise) throw Error('No se pudo crear el ejercicio.');
        else return createExercise;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = findOrCreateExercise;