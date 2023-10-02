const Video = require('../../models/Videos');
const PowerPoint = require('../../models/PowerPoint');
const cloudinary = require("../../utils/cloudinary");
const Class = require("../../models/Class");

async function updateClass (req, res, next){
    try {
        const { id } = req.params;
        const { name, description, video, powerPoint } = req.body;
        if(!video || !name || !description || !powerPoint) throw Error('Faltan datos');
        const newVideo = await Video.create({
            id: video.public_id,
            url: video.url
        })
        await newVideo.save();
        const newPowerPoint = await PowerPoint.create({
            id: powerPoint.public_id, 
            url: powerPoint.url
        });
        cloudinary.uploader.upload(newVideo.public_id, {resource_type: "Video", folder: "Video"});
        await newPowerPoint.save();
        const searchClass = await Class.findById(id).populate('video').populate('powerPoint');
        if(searchClass.video){
            const deleteVideo = await Video.findByIdAndDelete(searchClass.video._id);
            cloudinary.uploader.destroy(newVideo.public_id, {resource_type: "Video", folder: "Video"});
        };
        if(searchClass.powerPoint){
            const deletePowerPoint = await PowerPoint.findByIdAndDelete(searchClass.powerPoint.id);
        };
        const newClass = await Class.findByIdAndUpdate(id, {
            name,
            description,
            video: newVideo._id,
            powerPoint: newPowerPoint._id
        });
        res.status(200).json(newClass);
        
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};


module.exports = updateClass;