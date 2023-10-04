const mongoose = require('mongoose');

const QuestMongoose = new mongoose.Schema({
    quest:{
        type: String
    }
});

const Quest = mongoose.model("Quest", QuestMongoose);
module.exports = Quest;