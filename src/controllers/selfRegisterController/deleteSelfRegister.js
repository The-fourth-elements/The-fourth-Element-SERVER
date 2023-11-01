const SelfRegister = require("../../models/SelfRegister");


async function deleteSelfRegister(req, res, next){
    const { id } = req.params;
    try {
        const deleteSelfKnowledge = await SelfRegister.findByIdAndDelete(id);
        if(!deleteSelfKnowledge) throw Error('No se pudo eliminar el autoconocimiento.');
        return res.status(200).json({message: 'Autoconocimiento eliminado correctamente.'});
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = deleteSelfRegister;