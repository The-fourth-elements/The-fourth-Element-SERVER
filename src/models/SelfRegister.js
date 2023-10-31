const mongoose = require('mongoose');

const SelfRegisterSchema = new mongoose.Schema({
    training: {
        type: Array
    },
    challenge: {
        type: Array
    }
});

const SelfRegister = mongoose.model("SelfRegister", SelfRegisterSchema);
module.exports = SelfRegister;