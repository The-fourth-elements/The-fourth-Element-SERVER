const PowerPoint = require('../../models/PowerPoint')

async function createPowerPoint(req, res, next) {
    try {
        const { url } = req.body
        if (!url) throw Error('No se proporcionó URL del power point')

        const newPowerPoint = await PowerPoint.create({url})
        if (!newPowerPoint) throw Error('Ocurrió un error guardando la presentación')

        res.status(201).json(newPowerPoint)

    } catch (error) {
        next({ message: error.message, statusCode: 400 })
    }
}

module.exports = createPowerPoint