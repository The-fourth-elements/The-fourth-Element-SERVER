const mongoose = require('mongoose');

const ModuleMongoose = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    class:[{
        type: mongoose.Types.ObjectId,
        ref: "Class"
    }],
    state:{
        type: Boolean
    },
    quiz:{
        type: Number
    },
    startingDate:{
        type: Date,
        default: Date.now
    },
    endingDate:{
        type: Date,
    },
    payd: {
        type: Boolean
    }
});

const Module = mongoose.model("Module", ModuleMongoose);
module.exports = Module;