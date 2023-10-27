const findOrCreateSelfKnowledge = require("../../handler/modules/findOrCreateSelfKnowledge");
const Module = require("../../models/Module");


async function createSelfKnowledge(req, res, next){
    const { moduleId } = req.params;
    const { name, description, question } = req.body; 
    try {
        if(!name || !description || !question) throw Error('Faltan datos');
        const newSelfKnowledge = await findOrCreateSelfKnowledge(name, description, question);
        if(!newSelfKnowledge) throw Error('No se pudo crear el Autoconocimiento');
        const findModule = await Module.findById(moduleId);
        if (!findModule) throw Error('No se encontro el módulo al que agregar el autoconocimiento.');
        findModule.selfKnowledge = newSelfKnowledge;
        findModule.save();
        res.status(200).json({ message: 'Autoconocimiento creado', data: newSelfKnowledge });
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = createSelfKnowledge;