const Exercises = require('../../models/Exercises');

async function onlyCreateExercises(req, res, next){
    try {
        const { name, description, questions, image } = req.body;
        if(!name || !description || !questions) throw Error('Faltan datos');
        const exercisesCreate = await Exercises.create({
            name,
            description,
            questions,
            image
        })
        if(!exercisesCreate) throw Error('Error al crear el ejercicio');
        return res.status(200).json(exercisesCreate);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = onlyCreateExercises;