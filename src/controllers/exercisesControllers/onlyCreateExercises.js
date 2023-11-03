const findOrCreateExercise = require('../../handler/modules/findOrCreateExercise');

async function onlyCreateExercises(req, res, next){
    try {
        const { name, description, questions, image } = req.body;
        if(!name || !description || !questions) throw Error('Faltan datos');
        const newExercises = await findOrCreateExercise(name, description, questions, image);
        if(!newExercises) throw Error('Error al crear el ejercicio');
        return res.status(200).json(newExercises);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = onlyCreateExercises;