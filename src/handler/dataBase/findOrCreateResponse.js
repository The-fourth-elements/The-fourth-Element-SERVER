const Responses = require("../../models/Responses");

async function findOrCreateResponse(resp){
    const { verdadera, response } = resp;
    try {
        if (!response ) throw Error("Faltan datos");
        const findResponse = await Responses.findOne({ response });
        if (findResponse) return findResponse;
        const newResponse = await Responses.create({verdadera, response});
        if (newResponse) return newResponse._id;
        else throw Error("No se pudo crear la respuesta");
    } catch (error) {
        return {error: error.message}
    }
}

module.exports = findOrCreateResponse;