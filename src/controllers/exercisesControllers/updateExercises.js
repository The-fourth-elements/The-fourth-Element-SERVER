const Exercises = require('../../models/Exercises');

async function updateExercises(req, res, next){
    try {
        const { id } = req.params;
        const { body } = req;
        if(!id) throw Error('Ingrese un ID');
        if(!body.response) throw Error('Faltan datos');
        const exercises = await Exercises.findByIdAndUpdate(id, body, { new: true});
        if(!exercises) throw Error(`No se pudo modificar el ejercicio con id: ${id}`)
        return res.status(200).json({ message: 'Ejercicio actualizado'});
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = updateExercises;