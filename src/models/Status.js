const mongoose = require('mongoose');

const StatusMongoose = new mongoose.Schemas({
    state:{
        type: Boolean
    },
    starting_date:{
        type: Date,
        default: Date.now,
        required: true
    },
    ending_date:{
        type: Date
    }
})

module.exports = mongoose.model("Status", StatusMongoose);