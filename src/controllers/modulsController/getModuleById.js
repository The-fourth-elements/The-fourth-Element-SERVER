const Module = require("../../models/Module");

async function getModuleById(req, res, next){
    try {
        const { id } = req.params;

        if (id) {
            const module = await Module.findById(id);
            if (module) {
                res.status(200).json({ message: "Modulo encontrado", module: module });
            } else throw Error("No se pudo encontrar un modulo con ese ID");
        }

    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = getModuleById;