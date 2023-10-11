const Respnses = require('../../models/Responses');

async function delteResponse (req, res, next){
    try {
        const { id } = req.params;
        if(!id) throw Error('Ingrese un ID');
        const responseDelete = await Respnses.findByIdAndDelete(id);
        if(!responseDelete) throw Error('Respuesta no encontrada');
        return res.status(200).json({ message: "Respuesta borrada con exito" });
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
};

module.exports = delteResponse;