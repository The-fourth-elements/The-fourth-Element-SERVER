const ResponsesSR = require("../../models/ResponsesSR");
const { Users } = require("../../models/Users");

async function deleteResponseSR(req, res, next){
    const { responseSRId, userId } = req.params;
    try {
        if (!responseSRId || !userId) throw Error('Faltan identificadores.');
        const findUser = await Users.findById(userId);
        const removedResponse = findUser.responsesSR.filter(response => response._id.valueOf() !== responseSRId);
        findUser.responsesSR = removedResponse;
        await findUser.save();
        const deleteResponseSR = await ResponsesSR.findByIdAndRemove(responseSRId);
        if(!deleteResponseSR) throw Error('No se pudo eliminar la respuesta del ejercicio.');
        else res.status(200).json({ message: 'Respuesta eliminada correctamente.'})
    } catch (error) {
        next({ message: error.message, statusCode: 404})
    }
}

module.exports = deleteResponseSR;