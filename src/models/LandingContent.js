const mongoose = require('mongoose');
const { isURL, isAscii } = require('validator');

const LandingContentMongoose = new mongoose.Schema({
    testimonials: {
        type: String,
        validate: [isAscii, 'El testimonio debe ser un ASCII valido.']
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

const LandingContent = mongoose.model("LandingContent", LandingContentMongoose);
module.exports = LandingContent;