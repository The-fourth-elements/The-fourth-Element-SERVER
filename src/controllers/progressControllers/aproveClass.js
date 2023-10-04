const Progress = require('../../models/Progress');
const { Users } = require('../../models/Users');
const mongoose = require('mongoose');

const customError = require('../../helper/customError');

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
        const moduleProgress = modules.find((progressItem) => progressItem.moduleId.equals(moduleId))

        if (!moduleProgress) throw customError('Progreso del módulo no encontrado', 404)

        const classProgress = moduleProgress.classes.find((c) => c.classId.equals(classId))
        if (!classProgress) throw customError('Progreso de la clase no encontrado', 404)

        const onlockDate = new Date(classProgress.unlockDate)
        const now = new Date()

        if( onlockDate > now) throw customError('Clase bloqueada', 403)

        classProgress.approved = true;
        classProgress.approvedDate = new Date()

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
        next({ message: error.message, statusCode: error.statusCode })
    }
}
module.exports = approveClass;