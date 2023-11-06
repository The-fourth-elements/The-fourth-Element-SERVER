const { Users } = require('../../models/Users');
const Exercises = require('../../models/Exercises');
const ResponsesEX = require('../../models/ResponsesEX');

async function addResponseEXToUser (req, res, next){
    try {
        const { userId, responseExId } = req.params;
        if(!userId || !responseExId) throw Error('Ingrese un ID');
        const searchUser = await Users.findById(userId);
        if(!searchUser) throw Error(`No se pudo encontrar al usuario con ID: ${userId}`);
        const searchResponse = await ResponsesEX.findById(responseExId);
        if(!searchResponse) throw Error(`No se pudo encontrar la respuesta con ID: ${responseExId}`);
        searchUser.responsesEX.push(searchResponse);
        await searchUser.save();
        return res.status(200).json({ message: 'Respuesta de ejercicio agregada al usuario de forma correcta'});
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = addResponseEXToUser;