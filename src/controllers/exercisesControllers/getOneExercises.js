const Exercises = require('../../models/Exercises');

async function getOneExercises(req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const exercises = await Exercises.findById(id);
        if(!exercises) throw Error(`No se pudo encontrar el ejercicio con id: ${id}`);
        return res.status(200).json(exercises);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getOneExercises