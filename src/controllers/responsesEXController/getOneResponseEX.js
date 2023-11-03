const ResponsesEX = require('../../models/ResponsesEX');

async function getOneResponseEX(req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const searchResponse = await ResponsesEX.findById(id).populate({
            path: 'exercise',
            populate:{
                path: 'questions'
            }
        })
        if(!searchResponse) throw Error(`No se pudo encontrar la respuesta con ID: ${id}`);
        return res.status(200).json(searchResponse);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = getOneResponseEX;