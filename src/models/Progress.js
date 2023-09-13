const mongoose = require('mongoose');

const ProgressMongoose = new mongoose.Schemas({
    certificated:{
        type: Boolean
    },
    module_state:{
        type: String
    },
    assistance:{
        type: Number
    }
})

module.exports = mongoose.model("Progress", ProgressMongoose);