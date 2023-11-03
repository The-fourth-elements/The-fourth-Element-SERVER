const mongoose = require("mongoose");

const ResponsesSRMongoose = new mongoose.Schema({
    selfRegister: {
        type: mongoose.Types.ObjectId,
    },
    response: {
        type: Array,
    },
    comment: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ResponsesSR = mongoose.model('ResponsesSR', ResponsesSRMongoose);
module.exports = ResponsesSR;