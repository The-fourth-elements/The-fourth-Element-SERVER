const mongoose = require('mongoose');

const ProgressMongoose = new mongoose.Schema({
    certificated:{
        type: Boolean
    },
    module_state:{
        type: String
    },
    assistance:{
        type: Number
    }
});

const Progress = mongoose.model("Progress", ProgressMongoose);
module.exports = Progress;