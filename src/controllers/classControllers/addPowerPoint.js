const { Class, PowerPoint } = require("../../handler/dataBase/handleModels");

async function addPowerPointToClass(req, res, next) {
    try {
        const { classId, powerPointId } = req.params

        const existingClass = await Class.findById(classId)
        if (!existingClass) throw Error('Clase no encontrada')

        const existingPowerPoint = await PowerPoint.findById(powerPointId)
        if (!existingPowerPoint) throw Error('Presentación de power point no encontrada')

        existingClass.powerPoint = powerPointId;
        await existingClass.save();

        return res.status(200).json({ message: 'Presentación agregada a la clase con éxito' })
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = addPowerPointToClass