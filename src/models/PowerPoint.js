const mongoose = require('mongoose');
const { isURL } = require('validator');

const PowePointMongoose = new mongoose.Schema({
    id: {
        type: String 
    },
    url: {
        type: String,
        validate: [isURL, 'Profile image must be a valid URL']
    },
});

const PowePoint = mongoose.model("PowePoint", PowePointMongoose);
module.exports = PowePoint;