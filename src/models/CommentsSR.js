const mongoose = require("mongoose");

const CommentsSRMongoose = new mongoose.Schema({
    text:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const CommentsSR = mongoose.model('CommentsSR', CommentsSRMongoose);
module.exports = CommentsSR;