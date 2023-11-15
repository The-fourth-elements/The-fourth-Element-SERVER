require('dotenv').config();
const cloudinary = require('../../utils/cloudinary');
const { CLOUDINARY_API_SECRET } = process.env;
const Videos = require('../../models/Videos');

async function getVideoById(req, res, next) {
    try {
        const { id } = req.params
        const video = await Videos.findById(id);
        if (!video) res.status(404).json({ message: 'Video no encontrado' });
        const signature = cloudinary.utils.api_sign_request({url: video.url}, CLOUDINARY_API_SECRET);
        return res.status(200).json({url: `${video.url}?signature=${signature}`});
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getVideoById;
