const mongoose = require('mongoose');

const ResponsesMongoose = new mongoose.Schema({
    verdadera:{
        type: Boolean
    },
    response:{
        type: String
    }
});

const Responses = mongoose.model("Responses", ResponsesMongoose);
module.exports = Responses;