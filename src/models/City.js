const mongoose = require('mongoose');

const CityMongoose = new mongoose.Schema({
    name: {
        type: String
    }
})

const City = mongoose.model("City", CityMongoose);
module.exports = City;