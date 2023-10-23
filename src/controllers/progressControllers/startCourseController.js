const { Users } = require('../../models/Users');
const Module = require("../../models/Module");
const mongoose = require('mongoose')
const Progress = require('../../models/Progress');
const customError = require('../../helper/customError');
const getNextProgressModule = require('../../helper/getNextProgressModule');

async function start(req, res, next) {
    try {
        const { userId } = req.params
        if (!mongoose.Types.ObjectId.isValid(userId)) throw customError('ID de usuario no válido', 400)

        const user = await Users.findById(userId)
        if (!user) throw customError('Usuario no encontrado', 404)

        const modules = await Module.find()
            .populate('classModule')

        const progresoInicial = [
            getNextProgressModule(modules, 0)
        ]

        const newProgress = new Progress({
            certificated: false,
            modules: progresoInicial
        })
        await newProgress.save()
        user.progress = newProgress._id
        await user.save()

        res.status(200).json({ message: "Usuario inscrito con éxito" });
    } catch (error) {
        next({ message: error.message, statusCode: error.statusCode });
    }
}

module.exports = start