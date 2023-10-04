const mongoose = require('mongoose');

const QuizMongoose = new mongoose.Schema({
    quest:[{
        type: mongoose.Types.ObjectId,
        ref: "Quest"
    }],
    responses:[{
        type: mongoose.Types.ObjectId,
        ref: "Repsonses"
    }],
    results:{
        type: Number
    }
});

const Quiz = mongoose.model("Quiz", QuizMongoose);
module.exports = Quiz;