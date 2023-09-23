const mongoose = require('mongoose');

const VideoMongoose = new mongoose.Schema({
    url: {
        type: String
    },
});

const Video = mongoose.model("Video", VideoMongoose);
module.exports = Video;