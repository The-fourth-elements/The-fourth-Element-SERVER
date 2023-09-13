const mongoose = require('mongoose');

const CityMongoose = new mongoose.Schemas({
    name:{
        type: String
    }
})

module.exports = mongoose.model("City", CityMongoose);