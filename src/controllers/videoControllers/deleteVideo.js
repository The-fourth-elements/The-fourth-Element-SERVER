const Videos = require('../../models/Videos');
const cloudinary = require('../../utils/cloudinary');

async function deleteVideo(req, res, next) {
    try {
        const { id } = req.params;

        // Verifica si el video existe
        const video = await Videos.findById(id);
        if (!video) res.status(404).json({ message: 'El video no fue encontrado' });
        

        // Elimina el video
        const deletedVideo = await Videos.findByIdAndDelete(id);
        
        if (!deletedVideo) throw Error('Ocurrió un error al eliminar el video');

        cloudinary.uploader.destroy(video.public_id, {resource_type: "Video", folder: "Video"});

        res.status(200).json({ message: 'Video eliminado exitosamente' });

    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = deleteVideo;
