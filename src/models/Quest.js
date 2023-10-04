const mongoose = require('mongoose');

const QuestMongoose = new mongoose.Schema({
});

const Quest = mongoose.model("Quest", QuestMongoose);
module.exports = Quest;