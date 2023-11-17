const ResponsesSR = require('../../models/ResponsesSR');

async function getAllResponseSR (req, res, next){
    try {
        const searchResponse = await ResponsesSR.find({})
            .populate('response');
        if(searchResponse.length === 0) throw Error('No se encontraron respuestas');
        return res.status(200).json(searchResponse);
    } catch (error) {
        next({ message: error.message, satatusCode: 404 });
    }
};

module.exports = getAllResponseSR;