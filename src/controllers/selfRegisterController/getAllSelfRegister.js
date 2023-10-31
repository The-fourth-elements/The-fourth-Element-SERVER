const SelfRegister = require("../../models/SelfRegister");

async function getAllSelfRegister(req, res, next){
    try {
        const findSelfRegisters = await SelfRegister.find({})
            .populate('questions');
        if (findSelfRegisters.length <= 0) throw Error('No se encontraron autoconocimientos.');
        else res.status(200).json(findSelfRegisters);
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = getAllSelfRegister;