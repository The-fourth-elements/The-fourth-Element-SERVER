const mongoose = require('mongoose');

const MeditationSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description:{
        type: String
    },
    tracks:[{
        type: mongoose.Types.ObjectId,
        ref: "Tracks"
    }]
});

const Meditation = mongoose.model("Meditation", MeditationSchema);
module.exports = Meditation;