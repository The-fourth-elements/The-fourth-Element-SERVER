const Responses = require("../../models/Responses");

async function createResponse(resp){
    const { verdadera, response } = resp;
    try {
        if (!response) throw Error("Faltan datos");
        const newResponse = await Responses.create({verdadera, response});
        if (newResponse) return newResponse._id;
        else throw Error("No se pudo crear la respuesta")
    } catch (error) {
        return {error: error.message}
    }
}

module.exports = createResponse;