require('dotenv').config();
const Class = require("../../models/Class");
const Video = require('../../models/Videos')
const PowerPoint = require('../../models/PowerPoint')
const cloudinary = require('../../utils/cloudinary');
const { CLOUDINARY_API_SECRET } = process.env;

async function createClass(req, res, next) {
    try {
        const { name, description, video, powerPoint } = req.body
        if (!name || !description || !video || !powerPoint) throw Error("Faltan datos");

        const newVideo = await Video.create({id: video.id, url: video.url});
        const newPowerPoint = await PowerPoint.create({url: powerPoint.url})
        
        const newClass = await Class.create({name, description, video: newVideo._id, powerPoint: newPowerPoint._id});
        console.log(newClass);
        if (newClass) res.status(201).json(newClass);
        else throw Error('No se pudo crear la nueva clase')
        
    } catch (error) {
        next({ message: error.message, statusCode: 404 });
    }
}

module.exports = createClass