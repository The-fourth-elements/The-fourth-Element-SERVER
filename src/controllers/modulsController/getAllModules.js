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
        else return res.status(200).json(modules);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getAllModules;
