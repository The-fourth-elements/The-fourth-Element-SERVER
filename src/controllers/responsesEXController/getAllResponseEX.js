const ResponsesEX = require('../../models/ResponsesEX');

async function getAllResponseEX(req, res, next){
    try {
        const allResponse = await ResponsesEX.find({})
            .populate('exercise');
        if(allResponse.length === 0) throw Error(`No se pudieon encontrar respuestas`);
        return res.status(200).json(allResponse);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getAllResponseEX;