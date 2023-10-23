const Progress = require('../../models/Progress');
const { Users } = require('../../models/Users');
const mongoose = require('mongoose');

const customError = require('../../helper/customError');
const getNextProgressModule = require('../../helper/getNextProgressModule');
const getNextProgressClass = require('../../helper/getNextProgressClass');
const Module = require('../../models/Module');

async function approveClass(req, res, next) {
    try {
        const { userId, moduleId, classId } = req.params

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(moduleId) || !mongoose.Types.ObjectId.isValid(classId)) {
            throw customError('ID de usuario, ID de módulo o ID de clase no válido', 400)
        }

        const user = await Users.findById(userId)
        if (!user) throw customError('Usuario no encontrado', 404)
        if (!user?.progress) throw customError('El usuario aun no se ha inscrito a ningun curso', 400)

        const userProgress = await Progress.findById(user.progress._id)

        const modules = [...userProgress.modules]

        let moduleProgress

        const moduleIndex = modules.findIndex((progressItem) => progressItem.moduleId.equals(moduleId))

        if (moduleIndex !== -1) {
            moduleProgress = modules[moduleIndex];
        } else {
            throw customError('Progreso del módulo no encontrado', 404)
        }

        let classProgress

        const classIndex = moduleProgress.classes.findIndex((c) => c.classId.equals(classId))

        if (classIndex !== -1) {
            classProgress = moduleProgress.classes[classIndex]
        } else {
            throw customError('Progreso de la clase no encontrado', 404)
        }

        classProgress.approved = true;
        classProgress.approvedDate = new Date()

        const dbModules = await Module.find()
            .populate('classModule')

        if (!dbModules[moduleIndex].classModule[classIndex + 1]) {
            modules.push(getNextProgressModule(dbModules, moduleIndex + 1))
        } else {
            modules[moduleIndex].classes.push(getNextProgressClass(dbModules, moduleIndex, classIndex + 1))
        }

        await Progress.updateOne(
            { _id: user.progress._id },
            {
                $set: {
                    'modules': modules,
                },
            }
        )
        res.status(200).json({ message: "Clase aprobada con éxito" })
    } catch (error) {
        console.log(error)
        next({ message: error.message, statusCode: error.statusCode })
    }
}
module.exports = approveClass;