const Videos = require('../../models/Videos');
const cloudinary = require('../../utils/cloudinary');

async function updateVideo(req, res, next) {
    try {
        const { id } = req.params;
        const { video } = req.body;

        if (!video) throw Error('No se proporcionó una nueva URL para actualizar el video');

        const existingVideo = await Videos.findById(video.public_id);

        if (!existingVideo) res.status(404).json({ message: 'Video no encontrado' });

        existingVideo.url = video.url;

        const updatedVideo = await existingVideo.save();

        cloudinary.uploader.upload(video.public_id, {resource_type: "Video", folder: "Video"});
        
        res.status(200).json(updatedVideo);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = updateVideo;
