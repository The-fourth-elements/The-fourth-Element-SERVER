const mongoose = require('mongoose');

const TracksSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description:{
        type: String
    },
    track:{
        type: String
    }
});

const Tracks = mongoose.model("Tracks", TracksSchema);
module.exports = Tracks;