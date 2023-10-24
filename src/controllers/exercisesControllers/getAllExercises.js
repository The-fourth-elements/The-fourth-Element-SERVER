const Exercises = require('../../models/Exercises');

async function getAllExercises(req, res, next){
    try {
        const exercises = await Exercises.find({});
        if(exercises.length <= 0) throw Error('No hay ejercicios aun');
        return res.status(200).json(exercises);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getAllExercises