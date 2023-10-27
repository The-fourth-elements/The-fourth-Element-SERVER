const findOrCreateExercise = require('../../handler/modules/findOrCreateExercise');
const Module = require('../../models/Module');

async function createExercises(req, res, next){
    const { moduleId } = req.params;
    const { name, description, questions } = req.body;
    try {
        if(!questions) throw Error('Faltan datos');
        const newExercises = await findOrCreateExercise(name, description, questions);
        if(!newExercises) throw Error('Error al crear el ejercicio');
        const findModule = await Module.findById(moduleId);
        if (!findModule) throw Error('No se encontro el módulo al que agregar el ejercicio');
        findModule.exercises.push(newExercises);
        await findModule.save();
        return res.status(200).json({ message: 'Ejercicio creado y agregado al módulo con exito'});
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = createExercises;