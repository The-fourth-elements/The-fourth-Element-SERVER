const Module = require('../../models/Module');

const updateContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        if(!body) throw Error('Faltan datos');

        const uppdatedContent = await Module.findByIdAndUpdate(id, body, { new: true });
        if(!uppdatedContent) throw Error('Error al actualizar contenido');

        return res.status(200).json(uppdatedContent);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
};

module.exports = updateContent;