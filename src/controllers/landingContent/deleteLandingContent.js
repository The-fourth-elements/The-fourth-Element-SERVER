const LandingContent = require('../../models/LandingContent');

const deleteLandingContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const content = await LandingContent.deleteOne({ _id: id });
        if(!content) throw Error('Error al eliminar un contenido');
        return res.status(200).json({message: 'Contenido eliminado con exito'});
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = deleteLandingContent;