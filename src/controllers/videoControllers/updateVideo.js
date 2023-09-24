const Videos = require('../../models/Videos');

async function updateVideo(req, res, next) {
    try {
        const { id } = req.params
        const { url } = req.body

        if (!url) throw Error('No se proporcionó una nueva URL para actualizar el video');

        const existingVideo = await Videos.findById(id);

        if (!existingVideo) res.status(404).json({ message: 'Video no encontrado' });

        existingVideo.url = url;

        const updatedVideo = await existingVideo.save();

        res.status(200).json(updatedVideo);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = updateVideo;
