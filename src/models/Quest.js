const mongoose = require('mongoose');
const { regexStrings } = require('./Users');

const QuestMongoose = new mongoose.Schema({
    question:{
        type: String,
        validate: {
            validator: function(value){
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    },
    responses:[{
        type: mongoose.Types.ObjectId,
        ref: "Responses"
    }],
    approved: {
        type: Boolean
    }
});

const Quest = mongoose.model("Quest", QuestMongoose);
module.exports = Quest;