const mongoose = require('mongoose');
const { regexStrings } = require('./Users');


const CityMongoose = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter an city name'],
        validate: {
            validator: function(value){
                return regexStrings.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    }
});

const City = mongoose.model("City", CityMongoose);
module.exports = City;