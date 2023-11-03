const { Users } = require('../../models/Users');
const Exercises = require('../../models/Exercises');
const ResponsesEX = require('../../models/ResponsesEX');

async function addResponseEXToUser (req, res, next){
    try {
        const { userId, responseId } = req.params;
        if(!userId || !responseId) throw Error('Ingrese un ID');
        const searchUser = await Users.findById(userId);
        if(!searchUser) throw Error(`No se pudo encontrar al usuario con ID: ${userId}`);
        const searchResponse = await ResponsesEX.findById(responseId);
        if(!searchResponse) throw Error(`No se pudo encontrar la respuesta con ID: ${responseId}`);
        searchUser.responsesEX.push(searchResponse);
        await searchUser.save();
        return res.status(200).json({ message: 'RespuestaEX agregada al usuario de forma correcta'});
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = addResponseEXToUser;