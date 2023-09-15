const mongoose = require('mongoose');
const {Schema} = mongoose

const ProgressMongoose = new mongoose.Schema({
    certificated:{
        type: Boolean
    },
    module_state:{
        type: String
    },
    assistance:{
        type: Number
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
})

const Progress = mongoose.model("Progress", ProgressMongoose);
module.exports = Progress;