const Exercises = require("../../models/Exercises");

const findOrCreateExercise = async(questions) => {
    try {
        const exercises = await Promise.all(questions.map( async question => {
            const findExercise = await Exercises.findOne({question});
            if(findExercise) return findExercise;
            const createExercise = await Exercises.create({question});
            if (!createExercise) throw Error('No se pudo crear el ejercicio.');
            else return createExercise;
        }));
        return exercises;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = findOrCreateExercise;