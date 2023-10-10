const Quest = require("../../models/Quest");
const createResponse = require("../../handler/dataBase/createResponses");

async function createQuest(question){
    const { quest, responses } = question;
    try {
        if(!quest || !responses) throw Error("Faltan datos");
        const newResponse = await Promise.all(responses.map(async resp => await createResponse(resp)));
        const newQuest = await Quest.create({
            question: quest,
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