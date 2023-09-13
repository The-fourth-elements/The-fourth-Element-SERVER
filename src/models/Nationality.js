const mongoose = require('mongoose');

const NationalityMongoose = new mongoose.Schema({
    name:{
        type: String
    }
})

const Nationality = mongoose.model("Nationality", NationalityMongoose);
module.exports = Nationality;