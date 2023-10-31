const mongoose = require("mongoose");


const QuestionSchemas = new mongoose.Schema({
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

const Question = mongoose.model('Question', QuestionSchemas);
module.exports = Question;