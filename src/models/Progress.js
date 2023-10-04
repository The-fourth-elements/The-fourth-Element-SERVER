const mongoose = require('mongoose');
const Module = require('./Module');

const ProgressMongoose = new mongoose.Schema({
    certificated:{
        type: Boolean
    },
    modules:{
        type: Array
    },
    assistance:{
        type: Number
    }
});

const Progress = mongoose.model("Progress", ProgressMongoose);
module.exports = Progress;