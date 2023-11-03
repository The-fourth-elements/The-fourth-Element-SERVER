const ResponsesEX = require('../../models/ResponsesEX');

async function findOrCreateResponseEX(response, searchExercise){
    try {
        if(!response) throw Error('Ingrese una respuesta');
        const searchResponse = await ResponsesEX.find({ response });
        if(searchResponse.length) return searchResponse;
        const createResponse = await ResponsesEX.create({
            exercise: searchExercise,
            response
        });
        if(createResponse) return createResponse;
        throw Error('Error al encontrar o crear la respuesta');
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = findOrCreateResponseEX