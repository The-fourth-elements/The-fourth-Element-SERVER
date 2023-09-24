const PowerPoint = require('../../models/PowerPoint');

async function getPowerPointById(req, res, next) {
    try {
        const { id } = req.params
        const powerPoint = await PowerPoint.findById(id);

        if (!powerPoint) res.status(404).json({ message: 'presentacion no encontrada' });

        res.status(200).json(powerPoint);

    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = getPowerPointById;
