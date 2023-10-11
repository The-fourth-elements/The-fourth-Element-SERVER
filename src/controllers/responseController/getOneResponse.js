const Respnses = require('../../models/Responses');

async function getOneResponse (req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingese un ID');
        const response = await Respnses.findById(id);
        if(!response) throw Error(`No se pudo encontrar la respuesta con id: ${id}`);
        return res.status(200).json(response);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};


module.exports = getOneResponse;