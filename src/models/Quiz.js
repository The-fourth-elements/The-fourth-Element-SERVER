const mongoose = require('mongoose');

const QuizMongoose = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    description:{
        type: String
    },
    quest:[{
        type: mongoose.Types.ObjectId,
        ref: "Quest"
    }],
    results:{
        type: Number
    }
});

const Quiz = mongoose.model("Quiz", QuizMongoose);
module.exports = Quiz;