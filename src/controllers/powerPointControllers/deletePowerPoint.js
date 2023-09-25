const PowerPoint = require('../../models/PowerPoint');

async function deletePowerPoint(req, res, next) {
    try {
        const { id } = req.params;

        // Verifica si la presentacion existe
        const powerpoint = await PowerPoint.findById(id);
        if (!powerpoint) res.status(404).json({ message: 'El video no fue encontrado' });
        

        // Elimina el video
        const deletedPowerPoint = await PowerPoint.findByIdAndDelete(id);
        
        if (!deletedPowerPoint) throw Error('Ocurrió un error al eliminar la presentación');

        res.status(200).json({ message: 'Presentacion eliminada exitosamente' });

    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = deletePowerPoint;
