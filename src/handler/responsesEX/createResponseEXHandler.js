const ResponsesEX = require('../../models/ResponsesEX');

async function createResponseEXHandler(response, index, searchExercise){
    try {
        if(!response || !searchExercise) throw Error('Faltan datos al crear la respuesta');
        
        const createResponse = await ResponsesEX.create({
            exercise: searchExercise,
            response,
            index
        });
        if(!createResponse) throw Error('Error al encontrar o crear la respuesta');
        else return createResponse;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = createResponseEXHandler