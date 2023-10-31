const Questions = require("../../models/Questions");

const findOrCreateQuestion = async({ selfQuestion, agree, disagree }) => {
    try {
        if (!selfQuestion || !agree || !disagree) throw Error('Faltan datos');
        const findQuestion = await Questions.findOne({ selfQuestion });
        if (findQuestion) return findQuestion;
        const newQuestion = await Questions.create({ selfQuestion, agree, disagree });
        if (!newQuestion) throw Error('No se pudo crear la pregunta del autoconocimiento');
        else return newQuestion;        
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = findOrCreateQuestion;