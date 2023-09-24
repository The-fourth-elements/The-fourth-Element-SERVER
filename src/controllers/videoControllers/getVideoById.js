const Videos = require('../../models/Videos');

async function getVideoById(req, res, next) {
    try {
        const { id } = req.params
        const video = await Videos.findById(id);

        if (!video) res.status(404).json({ message: 'Video no encontrado' });

        res.status(200).json(video);

    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = getVideoById;
