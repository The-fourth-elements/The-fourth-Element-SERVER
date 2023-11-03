const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const ResponsesSRMongoose = new mongoose.Schema({
    selfRegister: {
        type: mongoose.Types.ObjectId,
    },
    response: {
        type: Array,
    },
    comments: [CommentsSchema]
});

const ResponsesSR = mongoose.model('ResponsesSR', ResponsesSRMongoose);
module.exports = ResponsesSR;