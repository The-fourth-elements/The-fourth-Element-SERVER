const Class = require("../../models/Class");

async function getAllClasses(req, res, next) {
    try {
        const classes = await Class.find()
            .populate('video')
            .populate('powerPoint');

        classes.length <= 0 ?
            res.status(404).json({ message: 'No se encontraron clases' }) :
            res.status(200).json(classes)

    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getAllClasses;
