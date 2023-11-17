const ResponsesEX = require("../../models/ResponsesEX");
const { Users } = require("../../models/Users");

async function deleteResponseEX(req, res, next){
    const { responseExId, userId } = req.params;
    try {
        if (!responseExId || !userId) throw Error('Faltan identificadores.');
        const findUser = await Users.findById(userId);
        const removedResponse = findUser.responsesEX.filter(response => response._id.valueOf() !== responseExId);
        findUser.responsesEX = removedResponse;
        await findUser.save(); 
        const deleteResponseEX = await ResponsesEX.findByIdAndRemove(responseExId);
        if(!deleteResponseEX) throw Error('No se pudo eliminar la respuesta del ejercicio');
        else res.status(200).json({ message: 'Respuesta eliminada correctamente.'});        
    } catch (error) {
        next({message: error.message, statusCode: 404});
    }
}

module.exports = deleteResponseEX;