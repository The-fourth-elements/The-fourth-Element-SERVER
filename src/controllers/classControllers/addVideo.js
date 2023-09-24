const { Class, Videos } = require("../../handler/dataBase/handleModels");

async function addVideoToClass(req, res, next) {
    try {
        const { classId, videoId } = req.params

        const existingClass = await Class.findById(classId)
        if (!existingClass) throw Error('Clase no encontrada')

        const existingVideo = await Videos.findById(videoId)
        if (!existingVideo) throw Error('Video no encontrado')

        existingClass.video = videoId;
        await existingClass.save();

        return res.status(200).json({ message: 'Video agregado a la clase con éxito' })
    } catch (error) {
        next(error);
    }
}

module.exports = addVideoToClass