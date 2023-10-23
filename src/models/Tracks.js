const mongoose = require('mongoose');
const { isURL } = require('validator');

const TracksSchema = new mongoose.Schema({
    public_id: {
        type: String 
    },
    url: {
        type: String,
        validate: [isURL, 'Track must be a valid URL']
    }
});

const Tracks = mongoose.model("Tracks", TracksSchema);
module.exports = Tracks;