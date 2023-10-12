const Responses = require('../../models/Responses');

async function handlerUpdateResponse(response){
    try {
        if(!response) throw Error('Faltan datos');
        const updateResponse = await Responses.create({
            
            verdadera: response.verdadera,
            response: response.response
        });
        if(!updateResponse) throw Error('Ocurrio un error al actualizar la respuesta');
        return updateResponse;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = handlerUpdateResponse;