const mongoose = require('mongoose');
const {isAscii} = require('validator');

const CityMongoose = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter an city name'],
        validate: [isAscii, 'Name must be a string']
    }
});

const City = mongoose.model("City", CityMongoose);
module.exports = City;