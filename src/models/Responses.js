const mongoose = require('mongoose');
const { regexStrings } = require('./Users');


const ResponsesMongoose = new mongoose.Schema({
    verdadera:{
        type: Boolean
    },
    response:{
        type: String,
        validate: {
            validator: function(value){
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    }
});

const Responses = mongoose.model("Responses", ResponsesMongoose);
module.exports = Responses;