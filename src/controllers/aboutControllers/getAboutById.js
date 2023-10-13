const About = require('../../models/About');

const getAboutById = async (request, response, next) => {
    try {
        const { id } = request.params;
        if (!id) throw Error('Ingrese un ID');
        const aboutFound = await About.findById(id);
        if (aboutFound) return response.status(200).json(aboutFound);
        throw Error('Error contenido no encontrado');
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getAboutById;