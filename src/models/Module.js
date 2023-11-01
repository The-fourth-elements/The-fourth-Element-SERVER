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
    meditation:[{
        type: mongoose.Types.ObjectId,
        ref: 'Meditation'
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
    exercises:[{
        type: mongoose.Types.ObjectId,
        ref: 'Exercises'
    }],
    selfRegister:[{
        type: mongoose.Types.ObjectId,
        ref: 'SelfRegister'
    }],
    quiz:[{
        type: mongoose.Types.ObjectId,
        ref: "Quiz"
    }]
});

const Module = mongoose.model("Module", ModuleMongoose);
module.exports = Module;
