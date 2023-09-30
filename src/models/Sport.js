const mongoose = require('mongoose');
const { isAscii } = require('validator');

const SportMongoose = new mongoose.Schema({
    name: {
        type: String
    }
});

const Sport = mongoose.model("Sport", SportMongoose);
module.exports = Sport;