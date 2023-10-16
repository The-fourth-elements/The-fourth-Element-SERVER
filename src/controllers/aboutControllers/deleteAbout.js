const About = require('../../models/About');

const deleteAbout = async (request, response, next) => {
    try {
        const { id } = request.params;
        if (!id) throw Error('Ingrese un ID');
        const content = await About.deleteOne({ _id: id });
        if (!content) throw Error('Error al eliminar el about');
        return response.status(200).json({ message: 'Contenido eliminado con exito' });
    }
    catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = deleteAbout;