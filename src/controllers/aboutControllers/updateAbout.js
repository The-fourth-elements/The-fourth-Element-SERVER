const About = require('../../models/About');

const putAbout = async (request, response, next) => {
    try {
        const { id } = request.params;
        if (!id) throw Error('Ingrese un ID');
        const { Contenido, Titulo } = request.body;
        console.log(request.body);
        const content = await About.findByIdAndUpdate(id, { title: Titulo, content: Contenido }, { new: true });
        if (!content) throw Error('Contenido no encontrado');
        return response.status(200).json(content);
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = putAbout;