const mongoose = require('mongoose');

const ModuleMongoose = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    quiz:{
        type: Number
    },
    video_url:{
        type: String
    }
});

const Module = mongoose.model("Module", ModuleMongoose);
module.exports = Module;