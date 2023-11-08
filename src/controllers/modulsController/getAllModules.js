const roleMiddleware = require("../../middlewares/roleMiddleware");
const Module = require("../../models/Module");


async function getAllModules(req, res, next){
    const { jsdklfsdjklfdsjfds } = req.cookies;
    try {
        const modules = await Module.find()
            .populate('classModule')
            .populate('quiz')
            .populate('exercises')
            .populate('selfRegister')

        if (modules.length <= 0) throw Error('No se encontraron módulos.')
        else {
            const roleUser = await roleMiddleware(jsdklfsdjklfdsjfds);
            if (roleUser >= 1) {
                res.status(200).json(modules)
            } else throw Error('No puede acceder al módulo por su rol');
        }
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getAllModules;