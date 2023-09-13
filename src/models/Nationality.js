const mongoose = require('mongoose');

const NationalityMongoose = new mongoose.Schemas({
    name:{
        type: String
    }
})


module.exports = mongoose.model("Nationality", NationalityMongoose);