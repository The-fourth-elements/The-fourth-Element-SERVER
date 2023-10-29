const SelfKnowledge = require("../../models/SelfKnowledge");

async function getAllSelfKnowledge(req, res, next){
    try {
        const findSelfKnowledges = await SelfKnowledge.find({})
            .populate('question');
        if (findSelfKnowledges.length <= 0) throw Error('No se encontraron autoconocimientos.');
        else res.status(200).json(findSelfKnowledges);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = getAllSelfKnowledge;