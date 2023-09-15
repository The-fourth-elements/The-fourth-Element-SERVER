const mongoose = require('mongoose');
const { Schema } = mongoose;

const CityMongoose = new mongoose.Schema({
    name: {
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
})

const City = mongoose.model("City", CityMongoose);
module.exports = City;