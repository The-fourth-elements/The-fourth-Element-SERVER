const { Users } = require('../../models/Users');
const Module = require("../../models/Module");
const mongoose = require('mongoose')
const Progress = require('../../models/Progress');
const customError = require('../../helper/customError');

async function inscription(req, res, next) {
    try {
        const { userId } = req.params

        if (!mongoose.Types.ObjectId.isValid(userId)) throw customError('ID de usuario no válido', 400)

        const user = await Users.findById(userId)
        if (!user) throw customError('Usuario no encontrado', 404)

        const modules = await Module.find()
            .populate('classModule')

        let currentDate = new Date()

        const progresoInicial = modules.map((module, moduleIndex) => ({
            module: module.name,
            moduleId: module._id,

            classes: module.classModule.map((clase, classIndex) => {
                const classDate = new Date(currentDate);

                if (moduleIndex === 0 && classIndex === 0) {
                    classDate.setDate(currentDate.getDate())
                } else {
                    if (currentDate.getDay() === 5) {
                        classDate.setDate(classDate.getDate() + 3)
                    } else {
                        classDate.setDate(classDate.getDate() + 1)
                    }
                }

                currentDate = classDate;

                return {
                    name: clase.name,
                    classId: clase._id,
                    approved: false,
                    approvedDate: null,
                    unlockDate: classDate,
                };
            }),
        }));

        const newProgress = new Progress({
            certificated: false,
            modules: progresoInicial
        })

        await newProgress.save()

        user.progress = newProgress._id;

        await user.save();

        res.status(200).json({ message: "Usuario inscrito con éxito" });
    } catch (error) {
        next({ message: error.message, statusCode: error.statusCode });
    }
}

module.exports = inscription