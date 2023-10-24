const Exercises = require('../../models/Exercises');

async function createExercises(req, res, next){
    try {
        const { id } = req.params;
        const { question } = req.body;
        if(!id) throw Error('Ingrese un ID');
        if(!question) throw Error('Faltan datos');
        const exercises = await Exercises.create({
            question
        });
        await exercises.save();
        if(!exercises) throw Error('Error al crear el ejercicio');
        return res.status(200).json({ message: 'Ejercicio creado con exito'});
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = createExercises;