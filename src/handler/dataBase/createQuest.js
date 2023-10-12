const Quest = require("../../models/Quest");
const createResponse = require("../../handler/dataBase/createResponses");

async function createQuest(quest){
    const { question, answers } = quest;
    try {
        if(!question || !answers) throw Error("Faltan datos");
        const newResponse = await Promise.all(answers.map(async resp => await createResponse(resp)));
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

module.exports = createQuest;