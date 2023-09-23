const mongoose = require('mongoose');
const { isURL } = require('validator');

const ContentMongoose = new mongoose.Schema({
    testimonials: {
        type: String
    },
    image: {
        type: String,
        validate: [isURL, "Must be and URL"]
    },
    video: {
        type: String,
        validate: [isURL, "Must be and URL"]
    }
})

const Content = mongoose.model("Content", ContentMongoose);
module.exports = Content;