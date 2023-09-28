const Class = require("../../models/Class");
const Video = require('../../models/Videos')
const PowerPoint = require('../../models/PowerPoint')

async function createClass(req, res, next) {
    try {
        const { name, description, video, powerPoint } = req.body
        if (!name || !description) throw Error("Faltan datos")

        let videoId, powerPointId;

        if (video) {
            const newVideo = new Video({
                id: video.id,
                url: video.url
            })
            await newVideo.save()
            videoId = newVideo._id
        } else throw ('Falta el video.')

        if (powerPoint) {
            const newPresentacion = new PowerPoint({
                url: powerPoint
            })
            await newPresentacion.save()
            powerPointId = newPresentacion._id
        } else throw ('Falta el Power Point.')

        const newClass = new Class({
            name,
            description,
            video: videoId,
            powerPoint: powerPointId
        })
        await newClass.save()

        if (newClass) res.status(201).json(newClass)
    } catch (error) {
        next({ message: error.message, statusCode: 204 });
    }
}

module.exports = createClass