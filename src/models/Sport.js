const mongoose = require('mongoose');
const regexSport = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ_ -]+$/;

const SportMongoose = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter an city name'],
        validate: {
            validator: function(value){
                return regexSport.test(value)
            },
            message: 'Solo se permiten numeros, letras'
        }
    }
});

const Sport = mongoose.model("Sport", SportMongoose);
module.exports = Sport;