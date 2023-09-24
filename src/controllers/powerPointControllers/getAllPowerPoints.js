const PowerPoint = require('../../models/PowerPoint')

async function getAllPowerPoints(req, res, next) {
    try {
        const powerPoints = await PowerPoint.find()
        powerPoints.length > 0 ?
            res.status(200).json(powerPoints) :
            res.status(404).json({ message: 'No se encontraron presentaciones de power point' });
    } catch (error) {
        next({ message: error.message, statusCode: 400 })
    }
}

module.exports = getAllPowerPoints