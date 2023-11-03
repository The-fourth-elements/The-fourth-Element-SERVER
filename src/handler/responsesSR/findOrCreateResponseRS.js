const ResponsesSR = require('../../models/ResponsesSR');
const findOrCreateComments = require('./findOrCreateComments');

async function findOrCreateResponseRS (response, comments, searchSelfRe){
    try {
        if(!response) throw Error('Ingrese una respuesta');
        const searchResponse = await ResponsesSR.find({response});
        if(searchResponse.length) return searchResponse;
        let newComments;
        if(comments){
            // const searchComments = await findOrCreateComments(comments);
            newComments = comments;
        }
        const createResponse = await ResponsesSR.create({
            selfRegister: searchSelfRe._id,
            response,
            comments: newComments
        })
        if(createResponse.length) return createResponse;
        throw Error('Error al encontrar o crear la respuesta');
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = findOrCreateResponseRS