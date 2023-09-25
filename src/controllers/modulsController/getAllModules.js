const Module = require("../../models/Module");


async function getAllModules(req, res){
    try {
        const modules = await Module.find();

        modules.length === 0 ?
        res.status(404).json({ message: 'No se encontraron modules' }) :
        res.status(200).json(modules)
    } catch (error) {
        
    }
}

module.exports = getAllModules;