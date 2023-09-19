const mongoose = require('mongoose');
const {isAscii} = require('validator');

const NationalityMongoose = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        require:true,
        validate: [isAscii, 'Name must be a string']
    }
});

const Nationality = mongoose.model("Nationality", NationalityMongoose);
module.exports = Nationality;