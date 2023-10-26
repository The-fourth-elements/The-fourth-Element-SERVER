const Quest = require("../../models/Quest");
const findOrCreateResponse = require("./findOrCreateResponse");

async function findOrCreateQuest(quest){
    const { question, answers } = quest;
    try {
        if(!question || !answers) throw Error("Faltan datos");
        const findQuest = await Quest.findOne({ question });
        if(findQuest) return findQuest;
        const newResponse = await Promise.all(answers.map(async resp => await findOrCreateResponse(resp)));
        const newQuest = await Quest.create({
            question,
            responses: newResponse,
            approved: false
        });
        if(!newQuest) throw Error("No se pudo crear la respuesta");
        return newQuest._id;
    } catch (error) {
        return {error: error.message}
    }
}

module.exports = findOrCreateQuest;