const ResponsesEX = require('../../models/ResponsesEX');
const Exercises = require('../../models/Exercises');
const { Users } = require('../../models/Users');
const findOrCreateResponseEX = require('../../handler/responsesEX/findOrCreateResponseEX');

async function createResponseEX (req, res, next){
    try {
        const { exerciseId, userId } = req.params;
        const { response } = req.body;
        if(!exerciseId || !userId) throw Error('Ingrese un ID');
        const searchExercise = await Exercises.findById(exerciseId);
        if(!response) throw Error('Ingrese una respuesta');
        const newResponse = await findOrCreateResponseEX(response, searchExercise);
        const searchUser = await Users.findById(userId);
        if(!searchUser) throw Error(`No se pudo encontrar el usuario con ID: ${userId}`);
        searchUser.responsesEX.push(newResponse);
        await searchUser.save();
        return res.status(200).json({ message: 'Respuesta agregada al usuario con éxito'});
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = createResponseEX;