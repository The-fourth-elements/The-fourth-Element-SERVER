const Respnses = require('../../models/Responses');

async function updateResponse(req, res, next){
    try {
        const { id } = req.params;
        const { body } = req;
        if(!id) throw Error('Ingrese un ID');
        if(!body) throw Error('Faltan Datos');
        const response = await Respnses.findByIdAndUpdate(id, body, {new: true});
        if(!response) throw Error('No se pudo actualizar la respuesta');
        return res.status(200).json(response);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = updateResponse;