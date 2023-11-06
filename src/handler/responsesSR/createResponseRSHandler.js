const ResponsesSR = require('../../models/ResponsesSR');

async function createResponseRSHandler (response, comments, searchSelfRe){
    try {
        if(!response || !searchSelfRe) throw Error('Faltan datos al crear la respuesta del autorregistro');
        const createResponse = await ResponsesSR.create({
            selfRegister: searchSelfRe,
            response,
            comments
        })
        if(!createResponse) throw Error('Error al encontrar o crear la respuesta');
        else return createResponse;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = createResponseRSHandler