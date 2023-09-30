const Class = require("../../models/Class");
const Module = require("../../models/Module");


async function addClassToModule(req, res, next){
    try {
        const { moduleId, classId } = req.params
        const existingModule= await Module.findById(moduleId)
        if (!existingModule) throw Error('Presentación de power point no encontrada');

        const existingClass = await Class.findById(classId)
        if (!existingClass) throw Error('Clase no encontrada');

        existingModule.classModule.push(existingClass)
        await existingModule.save();

        return res.status(200).json({ message: 'Clase agregada al modulo con éxito' })

    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = addClassToModule;