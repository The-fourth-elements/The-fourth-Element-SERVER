const Exercises = require('../../models/Exercises');
const { Users } = require('../../models/Users');
const createResponseEXHandler = require('../../handler/responsesEX/createResponseEXHandler');

async function createResponseEX (req, res, next){
    const { exerciseId, userId } = req.params;
    const { responses } = req.body;
    try {
        if(!exerciseId || !userId) throw Error('Ingrese un ID');
        if(!responses) throw Error('Ingrese las respuestas');

        const searchExercise = await Exercises.findById(exerciseId);
        if (!searchExercise) throw Error('No se encontró el ejercicio.');

        const newResponse = await Promise.all(responses.map(async response => await createResponseEXHandler(response, searchExercise)));
        
        const searchUser = await Users.findById(userId);
        if(!searchUser) throw Error(`No se pudo encontrar el usuario con ID: ${userId}`);

        newResponse.forEach(response => searchUser.responsesEX.push(response));
        await searchUser.save();
        
        return res.status(200).json({ message: 'Respuesta agregada al usuario con éxito'});
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = createResponseEX;