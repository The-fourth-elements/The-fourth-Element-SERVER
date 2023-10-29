const SelfKnowledge = require("../../models/SelfKnowledge");


const findOrCreateSelfKnowledge = async({name, description, questions}) => {
    try {
        const findSelfKnowledge = await SelfKnowledge.findOne({ name });
        if (findSelfKnowledge) return findSelfKnowledge;
        const createSelfKnowledge = await SelfKnowledge.create({ name, description, questions });
        if (!createSelfKnowledge) throw Error('No se pudo crear el autoconocimiento.');
        else return createSelfKnowledge;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = findOrCreateSelfKnowledge;