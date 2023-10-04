const mongoose = require('mongoose');

const RepsonsesMongoose = new mongoose.Schema({
    questResponses:[{
        verdadera:{
            type: Boolean
        },
        response:{
            type: String
        }
    }]
});

const Repsonses = mongoose.model("Repsonses", RepsonsesMongoose);
module.exports = Repsonses;