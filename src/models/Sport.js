const mongoose = require('mongoose');
const { isAscii } = require('validator');

const SportMongoose = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter an city name'],
        validate: [isAscii, 'Name must be a string']
    }
});

const Sport = mongoose.model("Sport", SportMongoose);
module.exports = Sport;