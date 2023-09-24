const mongoose = require('mongoose');
const {isAscii} = require('validator');

const nationMongoose = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        require:true,
        validate: [isAscii, 'Name must be a string']
    }
});

const Nation = mongoose.model("nation", nationMongoose);
module.exports = Nation;