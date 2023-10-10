const mongoose = require('mongoose');
const { regexStrings } = require('./Users');

const QuizMongoose = new mongoose.Schema({
    name:{
        type: String,
        required : true,
        validate: {
            validator: function(value){
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
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