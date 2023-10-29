const mongoose = require('mongoose');

const ExercisesSchema = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    questions: {
        type: Array
    },
    response:{
        type: String
    }
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);
module.exports = Exercises;