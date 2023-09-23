const mongoose = require('mongoose');

const PowePointMongoose = new mongoose.Schema({
    url: {
        type: String
    },
});

const PowePoint = mongoose.model("PowePoint", PowePointMongoose);
module.exports = PowePoint;