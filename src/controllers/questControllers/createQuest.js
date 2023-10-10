const Quest = require("../../models/Quest");
const createResponse = require("../../handler/dataBase/createResponses");

async function createQuest(req, res, next){
    const { quest, responses } = req.body;
    try {
        if(!quest || !responses) throw Error("Faltan datos");
        const newResponse = await Promise.all(responses.map(async resp => await createResponse(resp)));
        console.log(newResponse);
        const newQuest = await Quest.create({
            quest,
            responses: newResponse
        });
        if(!newQuest) throw Error("No se pudo crear la respuesta");
        else res.status(200).json({quest: newQuest, message: "Quest creada"});
    } catch (error) {
        next({message: error.message, statusCode: 404});
    }
}

module.exports = createQuest;