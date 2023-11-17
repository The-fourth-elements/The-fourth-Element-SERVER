const ResponsesSR = require('../../models/ResponsesSR');

async function getOneResponseSR (req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const searchResponse = await ResponsesSR.findById(id);
        if(!searchResponse) throw Error(`No se pudo encontar la respuesta con ID: ${id}`);
        return res.status(200).json(searchResponse);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getOneResponseSR;