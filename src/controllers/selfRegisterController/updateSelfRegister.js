const findOrCreateQuestion = require("../../handler/modules/findOrCreateQuestion");
const SelfRegister = require("../../models/SelfRegister");

async function updateSelfRegister(req, res, next){
    const { id } = req.params;
    const { body } = req;
    try {
        if (!body) throw Error('Faltan datos');
        if (body.questions) {
            body.questions = await Promise.all(body.questions.map(async question => await findOrCreateQuestion(question)));
        }
        const findAndUpdateSelfRegister = await SelfRegister.findByIdAndUpdate(id, body, { new: true });
        if (!findAndUpdateSelfRegister) throw Error('No se pudo modificar el autoconocimiento.');
        res.status(200).json(findAndUpdateSelfRegister);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = updateSelfRegister;