const mongoose = require('mongoose');

const UserSchemas = new mongoose.Schemas({
    name:{
        type: String,
        require: true
    },
    lastName:{
        type: String
    },
    adress:{
        type: String
    },
    city:{
        type: Number
    },
    natinality:{
        type: Number
    },
    module:{
        type: Array
    },
    role:{
        type: Number
    },
    progress:{
        type: Number
    },
    status:{
        type: Boolean
    },
    profile_img:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    }
});

module.exports = mongoose.model("users", UserSchemas);