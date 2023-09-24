const Videos = require('../../models/Videos')

async function getAllVideos(req, res, next) {
    try {
        const videos = await Videos.find()
        videos.length > 0 ?
            res.status(200).json(videos) :
            res.status(404).json({ message: 'No se encontraron videos' });
    } catch (error) {
        next({ message: error.message, statusCode: 400 })
    }
}

module.exports = getAllVideos