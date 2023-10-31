const mongoose = require("mongoose");

const ResponsesEXSchemas = new mongoose.Schema({
    exercise: {
        type: mongoose.Types.ObjectId
    },
    response: {
        type: String
    }
});

const ResponsesEX = mongoose.model('ResponsesEX', ResponsesEXSchemas)
module.exports = ResponsesEX;