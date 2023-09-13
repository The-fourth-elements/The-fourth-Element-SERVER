const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchemas = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String
    },
    adress: {
        type: String
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    nationality: {
        type: Schema.Types.ObjectId,
        ref: 'Nationality'
    },
    module: [{
        type: Schema.Types.ObjectId,
        ref: 'Module'
    }],
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    progress: {
        type: Schema.Types.ObjectId,
        ref: 'Progress'
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'Status'
    },
    profile_img: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

const Users = mongoose.model("Users", UserSchemas);
module.exports = Users;