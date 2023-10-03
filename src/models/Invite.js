const mongoose = require('mongoose');
const { isEmail } = require('validator');

const InviteMongoose = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    }
})

const Invite = mongoose.model("Invite", InviteMongoose);
module.exports = Invite;