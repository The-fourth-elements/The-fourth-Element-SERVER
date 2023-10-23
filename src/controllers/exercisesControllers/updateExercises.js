const Exercises = require('../../models/Exercises');

async function updateExercises(req, res, next){
    try {
        const { id } = req.params;
        const { nameBody, descriptionBody} = req.body;
        if(!id) throw Error('Ingrese un ID');
        if(!nameBody || !descriptionBody) throw Error('Faltan datos');
        const exercises = await Exercises.findByIdAndUpdate(id, {
            name: nameBody,
            description: descriptionBody
        }, { new: true});
        await exercises.save();
        if(!exercises) throw Error(`No se pudo encontrar el ejercicio con id: ${id}`)
        return res.status(200).json({ message: 'Ejercicio actualizado'});
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = updateExercises;