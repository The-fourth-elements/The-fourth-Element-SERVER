const mongoose = require('mongoose');

const ModuleMongoose = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    classModule:[{
        type: mongoose.Types.ObjectId,
        ref: "Class"
    }],
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
    paid: {
        type: Boolean
    }
});

const Module = mongoose.model("Module", ModuleMongoose);
module.exports = Module;