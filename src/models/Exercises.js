const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');

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