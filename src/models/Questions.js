const mongoose = require("mongoose");

const QuestionsSchemas = new mongoose.Schema({
    question: {
        type: Array
    },
    type: {
        type: String
    }
});

const Questions = mongoose.modle('Questions', QuestionsSchemas);
module.exports = Questions;