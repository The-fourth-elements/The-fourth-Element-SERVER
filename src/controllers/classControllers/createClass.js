const Class = require("../../models/Class");
const Video = require('../../models/Videos')
const PowerPoint = require('../../models/PowerPoint')

async function createClass(req, res, next) {
    try {
        const { name, description, videoURL, powerPointURL } = req.body
        if (!name || !description) throw Error("Faltan datos")

        let videoId, powerPointId

        if (videoURL) {
            const newVideo = new Video({
                url: videoURL
            })
            await newVideo.save()
            videoId = newVideo._id
        }

        if (powerPointURL) {
            const newPresentacion = new PowerPoint({
                url: powerPointURL
            })
            await newPresentacion.save()
            powerPointId = newPresentacion._id
        }

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