const SelfKnowledge = require("../../models/SelfRegister");

async function updateSelfKnowledge(req, res, next){
    const { id } = req.params;
    const { body } = req;
    try {
        if (!body) throw Error('Faltan datos');
        const findAndUpdateSelfKnowledge = await SelfKnowledge.findByIdAndUpdate(id, body, { new: true });
        if (!findAndUpdateSelfKnowledge) throw Error('No se pudo modificar el autoconocimiento.');
        res.status(200).json(findAndUpdateSelfKnowledge);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = updateSelfKnowledge;