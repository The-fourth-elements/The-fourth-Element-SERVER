const SelfKnowledge = require("../../models/SelfKnowledge");


async function getSelfKnowledgeById(req, res, next){
    const { id } = req.params;
    try {
        const findSelfKnowledge = await SelfKnowledge.findById(id);
        if(!findSelfKnowledge) throw Error('No se encontró el autoconocimiento');
        else res.status(200).json(findSelfKnowledge);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = getSelfKnowledgeById;