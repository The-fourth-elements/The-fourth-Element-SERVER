const LandingContent = require('../../models/LandingContent');

const uppdateLandingContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const { body } = req;
        const content = await LandingContent.findByIdAndUpdate(id, body, {new: true});
        if(!content) throw Error('Contenido no encontrado');
        return res.status(200).json(content);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = uppdateLandingContent;