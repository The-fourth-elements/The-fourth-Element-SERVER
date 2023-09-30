const Module = require("../../models/Module");


async function getAllModules(req, res, next){
    try {
        const modules = await Module.find();

        modules.length === 0 ?
        res.status(404).json({ message: 'No se encontraron modulos' }) :
        res.status(200).json(modules)
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = getAllModules;