const mongoose = require('mongoose');
const { regexStrings } = require('./Users');

const ModuleMongoose = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        validate: {
            validator: function(value){
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    },
    description:{
        type: String
    },
    classModule:[{
        type: mongoose.Types.ObjectId,
        ref: "Class"
    }],
    quiz:[{
        type: mongoose.Types.ObjectId,
        ref: "Quiz"
    }],
    startingDate:{
        type: Date,
        default: Date.now
    },
    endingDate:{
        type: Date,
    },
    paid: {
        type: Boolean
    },
    meditation:[{
        type: String,
        ref: 'Meditation'
    }],
    exercises:[{
        type: String,
        ref: 'Exercises'
    }],
    selfKnowledge:[{
        type: String,
        ref: 'SelfKnowledge'
    }]
});

const Module = mongoose.model("Module", ModuleMongoose);
module.exports = Module;
