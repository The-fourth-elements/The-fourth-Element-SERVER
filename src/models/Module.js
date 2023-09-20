const mongoose = require('mongoose');

const ModuleMongoose = new mongoose.Schema({
    name:{
        type: String
    },
    theory:{
        type: String
    },
    description:{
        type: String
    },
    quiz:{
        type: Object
    },
    video_url:{
        type: String
    }
});

const Module = mongoose.model("Module", ModuleMongoose);
module.exports = Module;