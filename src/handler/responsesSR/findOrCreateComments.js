const CommentsSR = require('../../models/CommentsSR');

async function findOrCreateComments (comments){
    try {
        if(!comments) throw Error('Ingrese un commentario');
        const searchComments = await CommentsSR.find({ comments });
        if(searchComments.length) return searchComments;
        const createComments = await CommentsSR.create({
            text: comments.text
        });
        if (createComments.length) return createComments;
        throw Error('Error al encontrar o crear el comentario');
    } catch (error) {
        return { error: error.message};
    }
};

module.exports = findOrCreateComments;