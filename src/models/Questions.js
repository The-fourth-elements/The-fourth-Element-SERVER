const mongoose = require('mongoose');
const { isAscii } = require('validator')

const QuestionsMongoose = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        require:true,
        validate: [isAscii, 'Por favor ingrese una pregunta']
    },
    results:{
        type: Number
    }
});

const Questions = mongoose.model("Questions", QuestionsMongoose);
module.exports = Questions;