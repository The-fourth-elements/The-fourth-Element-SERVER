const mongoose = require("mongoose");

const ResponsesEXSchemas = new mongoose.Schema({
    exercise: {
        type: mongoose.Types.ObjectId,
        ref: 'Exercises'
    },
    response: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const ResponsesEX = mongoose.model('ResponsesEX', ResponsesEXSchemas)
module.exports = ResponsesEX;