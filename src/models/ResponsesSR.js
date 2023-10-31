const mongoose = require("mongoose");

const ResponsesSRMongoose = new mongoose.Schema({
    selfRegister: {
        type: mongoose.Types.ObjectId
    },
    response: {
        type: Array
    },
    comment: {
        type: String
    }
});

const ResponsesSR = mongoose.model('ResponsesSR', ResponsesSRMongoose);
module.exports = ResponsesSR;