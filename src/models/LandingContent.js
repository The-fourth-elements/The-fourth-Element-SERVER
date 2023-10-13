const mongoose = require('mongoose');
const { isURL } = require('validator');

const LandingContentMongoose = new mongoose.Schema({
    testimonials: {
        type: String
    },
    image: {
        type: String,
        validate: [isURL, "Must be and URL"]
    }
})

const LandingContent = mongoose.model("LandingContent", LandingContentMongoose);
module.exports = LandingContent;