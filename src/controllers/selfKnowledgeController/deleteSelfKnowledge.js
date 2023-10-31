const SelfKnowledge = require("../../models/SelfRegister");


async function deleteSelfKnowledge(req, res, next){
    const { id } = req.params;
    try {
        const deleteSelfKnowledge = await SelfKnowledge.findByIdAndDelete(id);
        if(!deleteSelfKnowledge) throw Error('No se pudo eliminar el autoconocimiento.');
        return res.status(200).json({message: 'Autoconocimiento eliminado correctamente.'});
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = deleteSelfKnowledge;