const Meditation = require("../../models/Meditation");

async function deleteMeditation(req, res, next){
    const { id } = req.params;
    try {
        const deleteMeditation = await Meditation.findByIdAndDelete(id);
        if(!deleteMeditation) throw Error('No se pudo eliminar la meditación');
        else res.status(200).send('Meditación eliminada correctamente');
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
}

module.exports = deleteMeditation;

