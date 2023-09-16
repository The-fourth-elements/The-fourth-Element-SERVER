const mongoose = require('mongoose');

const StatusMongoose = new mongoose.Schema({
    state: {
        type: Boolean
    },
    starting_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    ending_date: {
        type: Date
    }
})

const Status = mongoose.model("Status", StatusMongoose);
module.exports = Status;