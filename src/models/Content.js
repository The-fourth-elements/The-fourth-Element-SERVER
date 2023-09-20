const mongoose = require('mongoose');

const ContentMongoose = new mongoose.Schema({
    testimonials: {
        type: String
    },
    image: {
        type: String
    },
    video: {
        type: String
    }
})

const Content = mongoose.model("Content", ContentMongoose);
module.exports = Content;