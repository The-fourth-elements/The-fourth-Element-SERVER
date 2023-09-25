const Module = require("../../models/Module");

async function getModuleById(req, res){
    try {
        const { id } = req.params;

        if (id) {
            const module = await Module.findById(id);
            if (module) {
                res.status(200).json({ message: "Module find", module: module });
            } else throw Error("Can't find a module with that id");
        }

    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = getModuleById;