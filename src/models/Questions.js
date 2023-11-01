const mongoose = require("mongoose");

const QuestionsSchemas = new mongoose.Schema({
    selfQuestion: {
        type: String
    },
    agree: {
        type: String
    },
    disagree: {
        type: String
    }
});

const Questions = mongoose.model('Questions', QuestionsSchemas);
module.exports = Questions;