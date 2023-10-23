const Tracks = require("../../models/Tracks");

async function deleteTrack(req, res, next){
    const { id } = req.params;
    try{
        if (!id) throw Error('Deve ingresar un id.');
        const deleteTrack = await Tracks.findByIdAndDelete(id);
        if(!deleteTrack) throw Error('No se pudo eliminar el Track');
        else res.status(200).send('Track eliminado');
    } catch(error){
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = deleteTrack;