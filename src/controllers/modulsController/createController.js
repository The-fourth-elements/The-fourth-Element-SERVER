const Module = require('../../models/Module');

const createContent = async (req, res, next) => {
    try {
        const { name, description, paid } = req.body;
        if (!name || !description) throw Error('Faltan datos.');
        const newContent = await Module.create({ name, description, paid });
        if (!newContent) throw Error('Error al crear contenido');
        return res.status(201).json(newContent);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = createContent;
