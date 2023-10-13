const { Users } = require('../../models/Users')
const mongoose = require('mongoose')
const Progress = require('../../models/Progress')

const customError = require('../../helper/customError')
const getProgress = require('../../helper/createProgress')

async function updateProgress(req, res, next) {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) throw customError('ID de usuario no válido', 400)
        const user = await Users.findById(userId);
        if (!user) throw customError('Usuario no encontrado', 404)

        if (!user.progress) {
            let newProgress = new Progress({
                certificated: false,
                modules: await getProgress()
            })
            await newProgress.save()
            user.progress = newProgress._id
            await user.save();
            res.status(200).json({ message: "Usuario inscrito con éxito" });
        } else {
            let existingProgress = await Progress.findById(user.progress._id);
            existingProgress = await getProgress(existingProgress)
            await Progress.findByIdAndUpdate(existingProgress._id, existingProgress)
            res.status(200).json({ message: "Usuario actualizado con éxito" });
        }

    } catch (error) {
        next({ message: error.message, statusCode: error.statusCode });
    }
}

module.exports = updateProgress