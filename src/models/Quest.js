const mongoose = require('mongoose');
const { regexStrings } = require('./Users');

const QuestMongoose = new mongoose.Schema({
    question:{
        type: String
    },
    responses:[{
        type: mongoose.Types.ObjectId,
        ref: "Responses"
    }],
    approved: {
        type: Boolean
    }
});

const Quest = mongoose.model("Quest", QuestMongoose);
module.exports = Quest;