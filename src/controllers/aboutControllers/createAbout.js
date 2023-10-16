const About = require('../../models/About');

const createAbout = async (request, response, next) => {
    try {
        const { Contenido, Titulo } = request.body;
        if (!Contenido || !Titulo) throw Error('Faltan datos');
        const newContent = await About.create({ content: Contenido, title: Titulo });
        if (newContent) return response.status(201).json(newContent);
        throw Error('Error al crear contenido');
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = createAbout