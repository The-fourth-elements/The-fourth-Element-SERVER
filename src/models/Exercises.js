const mongoose = require('mongoose');
const { isURL } = require('validator');

const ExercisesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    questions: {
        type: Array
    },
    image: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String,
            validate: [isURL, 'Please enter and URL valid']
        }
    }
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);
module.exports = Exercises;