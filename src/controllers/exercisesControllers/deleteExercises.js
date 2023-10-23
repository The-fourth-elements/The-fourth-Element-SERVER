const Exercises = require('../../models/Exercises');

async function deleteExercises(req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const exercises = await Exercises.findByIdAndDelete(id);
        if(!exercises) throw Error(`No se encontro el ejercicio con id: ${id}`);
        return res.status(200).json({ message: 'Ejercicio eliminado de forma exitosa'});
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = deleteExercises;