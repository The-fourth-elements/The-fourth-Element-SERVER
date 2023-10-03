 
const Class = require("../../models/Class");
const Video = require('../../models/Videos')
const PowerPoint = require('../../models/PowerPoint')
const mongoose = require('mongoose');

async function createClass(req, res, next) {
    let session = null
    try {
        const { name, description, video, powerPoint } = req.body
        if (!name || !description) {
            const error = new Error("Faltan datos")
            error.statusCode = 400
            throw error
        }

        session = await mongoose.startSession();
        session.startTransaction();

        let videoId, powerPointId;

        if (video) {
            const newVideo = new Video({
                id: video.id,
                url: video.url
            })
            await newVideo.save()
            videoId = newVideo._id
        } else {
            const error = new Error('Falta el video.')
            error.statusCode = 400
            throw error
        }

        if (powerPoint) {
            const newPresentacion = new PowerPoint({
                id: powerPoint.id,
                url: powerPoint.url
            })
            await newPresentacion.save()
            powerPointId = newPresentacion._id
        } else {
            const error = new Error('Falta el Power Point.')
            error.statusCode = 400
            throw error
        }

        const newClass = new Class({
            name,
            description,
            video: videoId,
            powerPoint: powerPointId
        })
        await newClass.save()

        await session.commitTransaction();
        session.endSession()

        if (newClass) res.status(201).json(newClass)
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        next({ message: error.message, statusCode: error.statusCode });
    }
}

module.exports = createClass