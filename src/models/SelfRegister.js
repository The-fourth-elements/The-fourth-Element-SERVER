const mongoose = require('mongoose');

const SelfRegisterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    questions: {
        type: Array,
        href: 'Question'
    },
    type: {
        type: String
    }
});

const SelfRegister = mongoose.model("SelfRegister", SelfRegisterSchema);
module.exports = SelfRegister;