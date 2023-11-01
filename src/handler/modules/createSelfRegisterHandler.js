const SelfRegister = require("../../models/SelfRegister");
const findOrCreateQuestion = require("./findOrCreateQuestion");


const createSelfRegisterHandler = async({name, type, questions}) => {
    try {
        const newQuestions = await Promise.all(questions.map(async question => await findOrCreateQuestion(question)));
        const createSelfRegister = await SelfRegister.create({ name, type });
        if (!createSelfRegister) throw Error('No se pudo crear el autoconocimiento.');
        createSelfRegister.questions = newQuestions;
        createSelfRegister.save();
        return createSelfRegister;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = createSelfRegisterHandler;