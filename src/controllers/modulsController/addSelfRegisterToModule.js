const { SelfKnowledge, Module } = require("../../handler/dataBase/handleModels");

async function addSelfRegisterToModule(req, res, next){
    const { moduleId, selfRId } = req.params;
    try {
        if (!moduleId, !selfRId) throw Error('Faltan datos');
        
        const findModule = await Module.findById(moduleId);
        if (!findModule) throw Error('No se encontró el módulo');

        const findSelfResponse = await SelfKnowledge.findById(selfRId);
        if (!findSelfResponse) throw Error('No se encontró el autorregistro a agregar.');

        findModule.selfRegister.push(findSelfResponse);
        findModule.save();
        
        return res.status(200).json({ message: 'Autorregistro agregado al módulo con exito' });
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = addSelfRegisterToModule;