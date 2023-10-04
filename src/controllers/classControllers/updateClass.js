const Video = require("../../models/Videos");
const PowerPoint = require("../../models/PowerPoint");
const cloudinary = require("../../utils/cloudinary");
const Class = require("../../models/Class");

async function updateClass(req, res, next) {
    try {
        const { id } = req.params;
        const { name, description, video, powerPoint } = req.body;
        if (!name || !description || !powerPoint) {
            throw Error("Faltan datos");
        }
        const searchClass = await Class.findById(id)
            .populate("video")
            .populate("powerPoint");

        let newVideoId;
        if (video && Object.keys(video).length > 0) {
            // Se proporciona un nuevo video en la solicitud
            const newVideo = await Video.create({
                id: video.id,
                url: video.url,
            });
            await newVideo.save();
            newVideoId = newVideo._id;

            if (searchClass.video) {
                const deleteVideo = await Video.findByIdAndDelete(
                    searchClass.video._id
                );
                await cloudinary.uploader.destroy(searchClass?.video?.id, {
                    resource_type: "video",
                });
            }
        }
        await PowerPoint.findByIdAndDelete(searchClass.powerPoint._id);
        const newPowerPoint = await PowerPoint.create({
            url: powerPoint,
        });
        await newPowerPoint.save();
        const updateData = {
            name,
            description,
            powerPoint: newPowerPoint._id,
        };

        if (newVideoId) {
            updateData.video = newVideoId;
        }

        const newClass = await Class.findByIdAndUpdate(id, updateData);
        res.status(200).json(newClass);
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = updateClass;
