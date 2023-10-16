const Progress = require('../../models/Progress')
const { Users } = require('../../models/Users')
const mongoose = require('mongoose')

const customError = require('../../helper/customError')

async function approveModule(req, res, next) {
    try {
        const { userId, moduleId } = req.params
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(moduleId) ) {
            throw customError('ID de usuario o ID de módulo no válido', 400)
        }

        const user = await Users.findById(userId)
        if (!user) throw customError('Usuario no encontrado', 404)
        if (!user?.progress) throw customError('El usuario aun no se ha inscrito a ningun curso', 400)

        const userProgress = await Progress.findById(user.progress._id)

        const modules = [...userProgress.modules]
        const moduleProgress = modules.find((progressItem) => progressItem.moduleId.equals(moduleId))
        if (!moduleProgress) throw customError('Progreso del módulo no encontrado', 404)

        moduleProgress.isApproved = true

        await Progress.updateOne(
            { _id: user.progress._id },
            {
                $set: {
                    'modules': modules,
                },
            }
        )
        res.status(200).json({ message: "Módulo aprobado con éxito" })
    } catch (error) {
        next({ message: error.message, statusCode: error.statusCode })
    }
}

module.exports = approveModule 