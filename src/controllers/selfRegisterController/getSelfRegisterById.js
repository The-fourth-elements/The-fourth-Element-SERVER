const SelfRegister = require("../../models/SelfRegister");


async function getSelfRegisterById(req, res, next){
    const { id } = req.params;
    try {
        const findSelfRegister = await SelfRegister.findById(id);
        if(!findSelfRegister) throw Error('No se encontró el autoconocimiento');
        else res.status(200).json(findSelfRegister);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = getSelfRegisterById;