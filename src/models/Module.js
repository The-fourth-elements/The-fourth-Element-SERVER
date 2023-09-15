const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
})

const Module = mongoose.model("Module", ModuleMongoose);
module.exports = Module;