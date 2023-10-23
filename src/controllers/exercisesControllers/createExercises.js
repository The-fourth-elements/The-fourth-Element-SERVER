const Exercises = require('../../models/Exercises');

async function createExercises(req, res, next){
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if(!id) throw Error('Ingrese un ID');
        if(!name || !description) throw Error('Faltan datos');
        const exercises = await Exercises.create({
            name,
            description
        });
        await exercises.save();
        if(!exercises) throw Error('Error al crear el ejercicio');
        return res.status(200).json({ message: 'Ejercicio creado con exito'});
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = createExercises;