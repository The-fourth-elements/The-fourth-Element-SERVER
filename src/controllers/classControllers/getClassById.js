const Class = require("../../models/Class");

async function getClassById(req, res, next) {
    try {
        const { id } = req.params

        const foundClass = await Class.findById(id)
            .populate('video')
            .populate('powerPoint')
        
        !foundClass ?
            res.status(404).json({ message: 'Clase no encontrada' }) :
            res.status(200).json(foundClass);

    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = getClassById;
