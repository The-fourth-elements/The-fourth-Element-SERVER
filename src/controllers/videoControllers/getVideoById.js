require('dotenv').config();
const cloudinary = require('../../utils/cloudinary');
const { CLOUDINARY_API_SECRET } = process.env;
const Videos = require('../../models/Videos');

async function getVideoById(req, res, next) {
    try {
        const { id } = req.params
        const video = await Videos.findById(id);

        const signature = cloudinary.utils.api_sign_request({id: video.id}, CLOUDINARY_API_SECRET);
        const secureURL = cloudinary.url(video.id, {
            secure: true,
            signature: signature
        });

        if (!video) res.status(404).json({ message: 'Video no encontrado' });

        res.status(200).json({url: secureURL});

    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = getVideoById;
