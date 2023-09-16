const mongoose = require('mongoose');
const {isAlpha} = require('validator')
const NationalityMongoose = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        require:true,
        validate: [isAlpha, 'Name must be a string']
    }
})

const Nationality = mongoose.model("Nationality", NationalityMongoose);
module.exports = Nationality;