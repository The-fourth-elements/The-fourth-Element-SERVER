const createSelfRegisterHandler = require("../../handler/modules/createSelfRegisterHandler");
const Module = require("../../models/Module");


async function createSelfRegister(req, res, next){
    const { moduleId } = req.params;
    const { selfRegister } = req.body;
    try {
        if(selfRegister.length <= 0) throw Error('Faltan datos');
        const newSelfRegister = await Promise.all(selfRegister.map(async selfR => {
            const newSelfR = await createSelfRegisterHandler(selfR);
            return newSelfR;
        }));
        if(newSelfRegister.length <= 0) throw Error('No se pudo crear el Autoconocimiento');
        const findModule = await Module.findById(moduleId);
        if (!findModule) throw Error('No se encontro el módulo al que agregar el autoconocimiento.');
        findModule.selfRegister = findModule.selfRegister.concat(newSelfRegister);
        findModule.save();
        res.status(200).json({ message: 'Autoconocimiento creado', data: newSelfRegister });
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = createSelfRegister;