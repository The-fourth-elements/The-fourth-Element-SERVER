const mongoose = require('mongoose');
const { regexStrings } = require('./Users');

const ClassMongoose = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingrese un nombre.'],
        validate: {
            validator: function(value){
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    },
    description: {
        type: String,
        required: [true, 'Por favor ingrese un nombre.'],
        validate: {
            validator: function(value){
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref: "Video"
    },
    powerPoint:{
        type: mongoose.Types.ObjectId,
        ref: "PowerPoint"
    },
    quiz:[{
        type: mongoose.Types.ObjectId,
        ref: "Quiz"
    }]
});

const Class = mongoose.model("Class", ClassMongoose);
module.exports = Class;