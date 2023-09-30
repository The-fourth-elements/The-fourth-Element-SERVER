const LandingContent = require('../../models/LandingContent');

async function getOneLandingContent(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            throw Error('Ingrese un ID');
        } else {
            const content = await LandingContent.findOne({"_id": id});
            if (content){
                res.status(200).json(content);
            } else {
                throw Error('No se encontro el contenido');
            }
        }
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getOneLandingContent;