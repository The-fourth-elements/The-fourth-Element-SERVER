const mongoose = require('mongoose');

const QuestMongoose = new mongoose.Schema({
    quest:{
        type: String
    },
    responses:[{
        type: mongoose.Types.ObjectId,
        ref: "Responses"
    }]
});

const Quest = mongoose.model("Quest", QuestMongoose);
module.exports = Quest;