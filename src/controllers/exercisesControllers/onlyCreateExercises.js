const Exercises = require('../../models/Exercises');
const findOrCreateExercise = require('../../handler/modules/findOrCreateExercise');

async function onlyCreateExercises(req, res, next){
    try {
        const { name, description, questions } = req.body;
        console.log(name, description, questions);
        if(!name || !description || !questions) throw Error('Faltan datos');
        const exercisesCreate = await Exercises.create({
            name,
            description,
            questions
        })
        console.log(exercisesCreate);
        if(!exercisesCreate) throw Error('Error al crear el ejercicio');
        return res.status(200).json(exercisesCreate);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = onlyCreateExercises;