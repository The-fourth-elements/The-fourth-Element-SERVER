const { Users } = require("../../models/Users");
const latestResponsesEX = require("../../utils/latestResponseEX");

async function getLatestResponsesEX(req, res, next){
    const { userId, exerciseId } = req.params;
    try {
        if(!userId) throw Error('Falta el ID del usuario.');

        const findUser = await Users.findById(userId);
        if (!findUser) throw Error('No se encontró el usuario.'); 
        console.log("findUser ", findUser);
        if (findUser.responsesEX.length <= 0) throw Error('No hay respuestas en el usuario');
        const userResponsesEX = findUser.responsesEX.filter(response => response.exercise.valueOf() === exerciseId);
        const latestResponses = latestResponsesEX(userResponsesEX);
        res.status(200).send(latestResponses);
    } catch (error) {
        console.log(error.message);
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getLatestResponsesEX;