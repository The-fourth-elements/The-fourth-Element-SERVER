const mongoose = require('mongoose');
const { isURL } = require('validator');

const VideoMongoose = new mongoose.Schema({
    id: {
        type: String 
    },
    url: {
        type: String,
        validate: [isURL, 'Profile image must be a valid URL']
    }
});

const Video = mongoose.model("Video", VideoMongoose);
module.exports = Video;