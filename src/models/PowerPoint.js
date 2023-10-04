const mongoose = require('mongoose');
const { isURL } = require('validator');

const PowerPointMongoose = new mongoose.Schema({
    url: {
        type: String,
        validate: [isURL, 'the URL must be a valid URL']
    },
});

const PowerPoint = mongoose.model("PowerPoint", PowerPointMongoose);
module.exports = PowerPoint;