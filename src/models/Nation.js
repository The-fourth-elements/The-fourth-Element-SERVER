const mongoose = require('mongoose');
const { regexStrings } = require('./Users');

const nationMongoose = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        require:true,
        validate: {
            validator: function(value){
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    }
});

const Nation = mongoose.model("Nation", nationMongoose);
module.exports = Nation;