const mongoose = require('mongoose');

const ModuleMongoose = new mongoose.Schemas({
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
})

module.exports = mongoose.model("Module", ModuleMongoose);