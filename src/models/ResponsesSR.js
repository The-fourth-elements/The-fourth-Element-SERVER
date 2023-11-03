const mongoose = require("mongoose");

const ResponsesSRMongoose = new mongoose.Schema({
    selfRegister: {
        type: mongoose.Types.ObjectId,
        ref: 'SelfRegister'
    },
    response: {
        type: Array
    },
    comments:{
        type: mongoose.Types.ObjectId,
        ref: 'CommentsSR'
    }
});

const ResponsesSR = mongoose.model('ResponsesSR', ResponsesSRMongoose);
module.exports = ResponsesSR;