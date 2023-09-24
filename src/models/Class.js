const mongoose = require('mongoose');

const ClassMongoose = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    videos: {
        type: mongoose.Types.ObjectId,
        ref: "Videos"
    },
    powerPoint:{
        type: mongoose.Types.ObjectId,
        ref: "PowerPoint"
    }
});

const Class = mongoose.model("Class", ClassMongoose);
module.exports = Class;