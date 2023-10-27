const Respnses = require('../../models/Responses');

async function getAllResponses (req, res, next){
    try {
        const responses = await Respnses.find({});
        if(responses.length <= 0) throw Error('No se encontraron respuestas.');
        return res.status(200).json(responses);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};


module.exports = getAllResponses;