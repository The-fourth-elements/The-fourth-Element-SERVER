const mongoose = require('mongoose');

const ExercisesSchema = new mongoose.Schema({
    question: {
        type: String
    },
    response:{
        type: String
    }
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);
module.exports = Exercises;