const roleMiddleware = require("../../middlewares/roleMiddleware");
const Module = require("../../models/Module");

async function getModuleById(req, res, next) {
    const { id } = req.params;
    const { jsdklfsdjklfdsjfds } = req.cookies;
    try {
        if (id) {
            const module = await Module.findById(id)
                .populate("classModule")
                .populate("quiz")
                .populate("exercises")
                .populate("selfRegister")
                .populate("meditation")
                .populate({
                    path: "meditation",
                    populate: {
                        path: "tracks",
                    },
                });
            if (!module) throw Error("No se pudo encontrar un modulo con ese ID");
            const userRole = await roleMiddleware(jsdklfsdjklfdsjfds);
            if (module.paid === false || userRole >= 1) return res.status(200).json({ message: "Modulo encontrado", module: module });
            else if(userRole <= 0 && module.paid === true) throw Error('No puede ingresar porque es un módulo pago.');
            else res.status(200).json({ message: "Modulo encontrado", module: module });
        }
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = getModuleById;
