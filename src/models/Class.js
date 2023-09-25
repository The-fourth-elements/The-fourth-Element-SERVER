const mongoose = require('mongoose');

const ClassMongoose = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref: "Video"
    },
    powerPoint:{
        type: mongoose.Types.ObjectId,
        ref: "PowerPoint"
    }
});

const Class = mongoose.model("Class", ClassMongoose);
module.exports = Class;