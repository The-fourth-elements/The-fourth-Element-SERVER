const Videos = require('../../models/Videos')

async function createVideo(req, res, next) {
    try {
        const { id, url } = req.body
        if (!url) throw Error('No se proporcionó URL del video')

        const newVideo = await Videos.create({id, url});
        if (!newVideo) throw Error('Ocurrió un error guardando el vídeo')

        res.status(201).json(newVideo)

    } catch (error) {
        next({ message: error.message, statusCode: 400 })
    }
}

module.exports = createVideo