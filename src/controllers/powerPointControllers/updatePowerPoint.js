const PowerPoint = require('../../models/PowerPoint');

async function updatePowerPoint(req, res, next) {
    try {
        const { id } = req.params
        const { url } = req.body

        if (!url) throw Error('No se proporcionó una nueva URL para la presentación de PowerPoint');

        const existingPowerPoint = await PowerPoint.findById(id);

        if (!existingPowerPoint) res.status(404).json({ message: 'Presentación de PowerPoint no encontrada' })

        existingPowerPoint.url = url;

        const updatedPowerPoint = await existingPowerPoint.save();

        res.status(200).json(updatedPowerPoint);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = updatePowerPoint;